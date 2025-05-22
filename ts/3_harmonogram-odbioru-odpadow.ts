const checkWhenICanTakeOutTheGarbage = (function () {
   const { byId, byQuery, prepare, setStyle, add } = dom

   const getTwoNearestFutureDates = (dates: Date[]) => {
      const now = new Date();

      return dates
         .filter(date => date > now)           // tylko daty w przyszłości
         .sort((a, b) => a.getTime() - b.getTime()) // sortowanie rosnąco
         .slice(0, 2);                         // wybierz dwie najbliższe
   }

   const schedulePeriodsWithDataForCommunity = (fn1: any, fn2: any, fn3: any) => {
      const formData = new FormData()
      formData.append("communityId", "108")

      // @ts-ignore
      axios.post("https://pluginecoapi.ecoharmonogram.pl/v1/schedulePeriodsWithDataForCommunity", formData, {
         headers: {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "pl,en-US;q=0.7,en;q=0.3",
         },
         withCredentials: false
      })
         .then((response: any) => {
            fn1(fn2, fn3, response.data.data.schedulePeriods)
         })
         .catch((error: any) => {
            console.error(error)
         });
   }

   const getPlaceIds = (fn1: any, fn2: any, data: any) => {
      // console.log('%c >>> schedulePeriodsWithDataForCommunity:', 'background: #ffcc00; color: #003300', data)
      const form = new FormData()
      form.append('townId', '2149')
      form.append('periodId', data[0].id)

      // @ts-ignore
      axios.post('https://pluginecoapi.ecoharmonogram.pl/v1/streetsForTown', form, {
         headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'pl,en-US;q=0.7,en;q=0.3',
         },
         withCredentials: false // odpowiednik "credentials": "omit"
      })
         .then((response: any) => {
            const myStreet = response.data.data.find((item: any) => item.name.indexOf('Kurierów') > -1)
            fn1(fn2, myStreet)
         })
         .catch((error: any) => {
            console.error(error)
         });

   }

   const getInfoData = (fn: any, data: any) => {
      // console.log('%c >>> myStreet:', 'background: #ffcc00; color: #003300', data)
      const form = new FormData();

      const splittedStreetIds = data.choosedStreetIds.split(',')
      const streetId = splittedStreetIds[splittedStreetIds.length - 1]

      form.append('townId', '2149')
      form.append('streetName', 'Kurierów Armii Krajowej')
      form.append('number', '7b')
      form.append('streetId', streetId)
      form.append('schedulePeriodId', data.perId)
      form.append('lng', 'pl')

      // @ts-ignore
      axios.post('https://pluginecoapi.ecoharmonogram.pl/v1/schedules', form, {
         headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'pl,en-US;q=0.7,en;q=0.3',
         }
      })
         .then((response: any) => {
            const data = response.data.data
            const names = data.scheduleDescription.map((item: any) => ({ id: item.id, name: item.name }))

            const currentMonth = (new Date().getMonth() + 1).toString()
            const nextMonth = (new Date().getMonth() + 2).toString()
            const currentYear = new Date().getFullYear()

            const schedules = data.schedules
               .filter((item: any) => item.month === currentMonth || item.month === nextMonth)
               .map((item: any) => ({
                  name: names.find((n: any) => n.id === item.scheduleDescriptionId)?.name,
                  month: item.month,
                  days: item.days.split(';'),
               }))

            const namesWithDates: {
               name: string,
               dates: Date[],
            }[] = []

            schedules.forEach((item: any) => {
               const node = namesWithDates.find((n: any) => n.name === item.name)

               if (node) {
                  if (item.days && item.days.length > 0) {
                     item.days.forEach((d: string) => {
                        const day = new Date(currentYear, Number(item.month) - 1, Number(d), 6, 0, 0)
                        node.dates.push(day)
                     })
                  } else {
                     node.dates = []
                  }
               } else {
                  if (item.days && item.days.length > 0) {
                     namesWithDates.push({
                        name: item.name,
                        dates: item.days.map((d: string) => new Date(currentYear, Number(item.month) - 1, Number(d), 6, 0, 0)),
                     })
                  } else {
                     namesWithDates.push({
                        name: item.name,
                        dates: []
                     })
                  }
               }
            })

            const result = namesWithDates.map((item: any) => ({
               name: item.name,
               dates: getTwoNearestFutureDates(item.dates),
            }))

            fn(result)
         })
         .catch((error: any) => {
            console.error('Błąd:', error)
         })
   }

   const showInfo = (pos: { x: number, y: number, side: boolean }, interval: NodeJS.Timeout) => (data: any) => {
      // console.log('%c >>> getInfoData:', 'background: #ffcc00; color: #003300', data)

      type PureItemT = {
         name: string
         dates: string[]
      }

      type DayNumberTimeT = {
         name: string
         dates: number[]
      }

      const convertDatesToDayDiffs = (items: PureItemT[]) => {
         const today = new Date()
         today.setHours(0, 0, 0, 0)

         const result: DayNumberTimeT[] = items.map(item => ({
            name: item.name,
            dates: item.dates.map(dateStr => {
               const date = new Date(dateStr)
               date.setHours(0, 0, 0, 0)
               const diffTime = date.getTime() - today.getTime()
               return Math.floor(diffTime / (1000 * 60 * 60 * 24))
            })
         }))

         return result
      }

      const convertDatesToDayNames = (items: DayNumberTimeT[]) => items.map((item) => {
         const newDates = item.dates.map(date => {
            if (date === 0) return 'dziś'
            if (date === 1) return 'jutro'
            if (date === 2) return 'pojutrze'
            return `za ${date} dni`
         })
         return {
            name: item.name,
            dates: newDates,
         }
      })

      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

      const timing = convertDatesToDayNames(convertDatesToDayDiffs(data))

      clearInterval(interval)
      const garbageTime = byId('garbage-time')
      prepare(garbageTime, { inner: '' })

      const oldGarbageBox = byQuery('#garbage-time #garbage-box')
      prepare(oldGarbageBox, { delete: true })

      const garbageBox = prepare('div', { id: 'garbage-box', classes: ['garbage-box'] })
      setStyle(garbageBox, 'visibility', 'hidden')
      prepare(garbageTime, { children: [garbageBox] })

      const tbody = timing.map((time) => {
         const name = prepare('td', { inner: capitalize(time.name) })
         const dates = prepare('td', { inner: time.dates.join(', ') })
         return prepare('tr', { children: [name, dates] })
      })

      prepare(garbageBox, {
         children: [
            prepare('table', {
               children: [
                  prepare('tbody', { children: tbody })]
            })]
      })

      const closeGarbageWidow = () => {
         setStyle(garbageTime, 'opacity', '0')

         setTimeout(() => {
            prepare(garbageBox, { delete: true })
            setStyle(garbageTime, 'display', 'none')
            setStyle(garbageTime, 'visibility', 'hidden')
            setStyle(garbageTime, 'width', '50px')
            setStyle(garbageTime, 'height', '50px')
         }, 320)
      }

      setTimeout(() => {
         const width = garbageBox.offsetWidth
         const height = garbageBox.offsetHeight

         setStyle(garbageTime, 'width', `${width}px`)
         setStyle(garbageTime, 'height', `${height}px`)
         setStyle(garbageTime, 'left', `${pos.side ? pos.x - width - 90 : pos.x - 30}px`)
         add(garbageTime, 'click', closeGarbageWidow)

         setStyle(garbageBox, 'visibility', 'visible')
      }, 300)
   }

   schedulePeriodsWithDataForCommunity(getPlaceIds, getInfoData, showInfo)


   const show = (event?: MouseEvent) => {
      const x = event.clientX + window.scrollX
      const y = event.clientY + window.scrollY
      const side = window.innerWidth / 2 < event.clientX

      const garbageTime = byId('garbage-time')
      setStyle(garbageTime, 'display', 'block')
      setStyle(garbageTime, 'visibility', 'visible')
      setStyle(garbageTime, 'width', '50px')
      setStyle(garbageTime, 'height', '50px')
      setStyle(garbageTime, 'left', `${x - 30}px`)
      setStyle(garbageTime, 'top', `${y - 15}px`)
      setTimeout(() => setStyle(garbageTime, 'opacity', '1'), 10)

      let garbageBox = byId('garbage-box')
      if (!garbageBox) {
         garbageBox = prepare('div', { id: 'garbage-box', classes: ['garbage-box'] })
         setStyle(garbageBox, 'visibility', 'visible')
         prepare(garbageTime, { children: [garbageBox] })
      }

      let dots = '.'
      prepare(garbageBox, { inner: dots })
      let interval = setInterval(() => {
         dots += '.'
         prepare(garbageBox, { inner: dots })
         if (dots.length > 8) dots = ''
      }, 60)

      schedulePeriodsWithDataForCommunity(getPlaceIds, getInfoData, showInfo({ x, y, side }, interval))
   }

   return {
      show,
   }
}())