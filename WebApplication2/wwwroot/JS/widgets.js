document.addEventListener('DOMContentLoaded', function () {
    // Sayfa yüklendiğinde temayı kontrol et
    function createCandleStickChart(elementId, options) {
        var chart = new ApexCharts(document.querySelector(elementId), options);
        chart.render();
    }
    function applyTheme(theme) {

        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(theme);

        document.querySelectorAll('.card').forEach(card => card.classList.replace('light-mode', theme));
        document.querySelectorAll('.card-title').forEach(title => title.classList.replace('light-mode', theme));
        document.querySelectorAll('.card-value').forEach(value => value.classList.replace('light-mode', theme));
        document.querySelectorAll('.chart').forEach(chart => chart.classList.replace('light-mode', theme));
        document.querySelectorAll('.chart-tooltip').forEach(tooltip => tooltip.classList.replace('light-mode', theme));
        document.querySelectorAll('.footer').forEach(footer => footer.classList.replace('light-mode', theme));

    }
    function updateTooltipContent(date, value) {
        var tooltip = document.getElementById('chart-tooltip');
        if (tooltip) {
            tooltip.querySelector('.tooltip-date').textContent = date;
            tooltip.querySelector('.tooltip-value').textContent = value;

            // Gece modunda stil güncellemesi
            if (document.body.classList.contains('dark-mode')) {
                tooltip.style.backgroundColor = '#333';
                tooltip.style.color = '#fff';
            }
        }
    }

    function toggleTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        applyTheme(isDarkMode ? 'light-mode' : 'dark-mode');
    }

    // Gece modunu başlat
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark-mode');
    } else {
        applyTheme('light-mode');
    }

    // Tema değiştirme butonuna tıklama olayını ekle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Rakam animasyon fonksiyonu
    function animateNumber(element, endValue) {
        let startValue = 0;
        let duration = 2000; // Animasyon süresi (ms)
        let stepTime = 10; // Her adımın süresi (ms)
        let steps = duration / stepTime;
        let stepValue = endValue / steps;

        function updateNumber() {
            startValue += stepValue;
            if (startValue >= endValue) {
                element.textContent = endValue;
            } else {
                element.textContent = Math.floor(startValue);
                requestAnimationFrame(updateNumber);
            }
        }

        updateNumber();
    }


    let counterElements = document.querySelectorAll('.counter');
    counterElements.forEach(element => {
        let endValue = parseInt(element.dataset.value, 10);
        if (!isNaN(endValue)) {
            animateNumber(element, endValue);
        }
    });



    // ApexCharts grafik yapılandırması
    var options1 = {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            }
        },


        series: [{
            name: 'Sales',
            data: [150, 100, 300, 200, 99, 250, 300, 351, 425]
        }],
        xaxis: {
            categories: ['2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05', '2024-09-06', '2024-09-07', '2024-09-08', '2024-09-09'], // Tarihler
            labels: {
                show: false // X ekseni üzerinde tarihler gösterilmez
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tooltip: {
                enabled: false // X ekseni ile ilgili tooltip gizlenir
            },
            type: 'category'
        },
        yaxis: {
            labels: {
                show: false // Y eksenindeki göstergeleri gizler
            },
            axisBorder: {
                show: false // Y eksenindeki çizgiyi gizler
            },
            axisTicks: {
                show: false // Y eksenindeki tik işaretlerini gizler
            }
        },
        grid: {
            show: false // Arka plandaki çizgileri gizler
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#6362e7'] // Çizgi rengini mor yapıyoruz
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.5,
                inverseColors: false,
                opacityFrom: 1.0,
                opacityTo: 0.0,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#6362e7',
                        opacity: 1.0
                    },
                    {
                        offset: 100,
                        color: '#6362e7',
                        opacity: 0.0
                    }
                ]
            }
        },
        markers: {
            size: 0, // İşaretleyiciler gizlenir
            colors: ['#6362e7'],
            strokeColors: '#FFFFFF',
            strokeWidth: 2
        },
        tooltip: {
            theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light', // Gece/Gündüz moduna göre tema ayarı
            x: {
                formatter: function (value, { dataPointIndex, w }) {
                    // Tooltip'te tarih gösterimi
                    return w.globals.categoryLabels[dataPointIndex]; // X eksenindeki kategoriden tarih bilgisi alınıyor
                }
            },
            y: {
                formatter: function (value) {
                    // Tooltip'te satış değeri gösterimi
                    return value + " Sales"; // Veri değeri formatı
                }
            },
            marker: {
                show: true, // Tooltip'teki işaretleyici noktalar görünür
                fillColors: ['#6362e7'] // Marker rengi ayarlanır (örneğin kırmızı)
            }
        },

        dataLabels: {
            enabled: false // Veri etiketlerini gizler
        },
    };



    var options2 = {
        chart: {
            height: 200,
            width:  358,
            type: 'area', // Grafik türünü değiştirdim
            toolbar: {
                show: false
            },
            zoom: {
                autoScaleYaxis:true
            }
        },
        series: [{
            name: 'Price',
            data: [
                [1331161200000, 33.05],
                [1331247600000, 33.64],
                [1331506800000, 33.56],
                [1331593200000, 34.22],
                [1331679600000, 33.77],
                [1331766000000, 34.17],
                [1331852400000, 33.82],
                [1332111600000, 34.51],
                [1332198000000, 33.16],
                [1332284400000, 33.56],
                [1332370800000, 33.71],
                [1332457200000, 33.81],
                [1332712800000, 34.40],
                [1332799200000, 34.63],
                [1332885600000, 34.46],
                [1332972000000, 34.48],
                [1333058400000, 34.31],
                [1333317600000, 34.70],
                [1333404000000, 34.31],
                [1333490400000, 33.46],
                [1333576800000, 33.59],
                [1333922400000, 33.22],
                [1334008800000, 32.61],
                [1334095200000, 33.01],
                [1334181600000, 33.55],
                [1334268000000, 33.18],
                [1334527200000, 32.84],
                [1334613600000, 33.84],
                [1334700000000, 33.39],
                [1334786400000, 32.91],
                [1334872800000, 33.06],
                [1335132000000, 32.62],
                [1335218400000, 32.40],
                [1335304800000, 33.13],
                [1335391200000, 33.26],
                [1335477600000, 33.58],
                [1335736800000, 33.55],
                [1335823200000, 33.77],
                [1335909600000, 33.76],
                [1335996000000, 33.32],
                [1336082400000, 32.61],
                [1336341600000, 32.52],
                [1336428000000, 32.67],
                [1336514400000, 32.52],
                [1336600800000, 31.92],
                [1336687200000, 32.20],
                [1336946400000, 32.23],
                [1337032800000, 32.33],
                [1337119200000, 32.36],
                [1337205600000, 32.01],
                [1337292000000, 31.31],
                [1337551200000, 32.01],
                [1337637600000, 32.01],
                [1337724000000, 32.18],
                [1337810400000, 31.54],
                [1337896800000, 31.60],
                [1338242400000, 32.05],
                [1338328800000, 31.29],
                [1338415200000, 31.05],
                [1338501600000, 29.82],
                [1338760800000, 30.31],
                [1338847200000, 30.70],
                [1338933600000, 31.69],
                [1339020000000, 31.32],
                [1339106400000, 31.65],
                [1339365600000, 31.13],
                [1339452000000, 31.77],
                [1339538400000, 31.79],
                [1339624800000, 31.67],
                [1339711200000, 32.39],
                [1339970400000, 32.63],
                [1340056800000, 32.89],
                [1340143200000, 31.99],
                [1340229600000, 31.23],
                [1340316000000, 31.57],
                [1340575200000, 30.84],
                [1340661600000, 31.07],
                [1340748000000, 31.41],
                [1340834400000, 31.17],
                [1340920800000, 32.37],
                [1341180000000, 32.19],
                [1341266400000, 32.51],
                [1341439200000, 32.53],
                [1341525600000, 31.37],
                [1341784800000, 30.43],
                [1341871200000, 30.44],
                [1341957600000, 30.20],
                [1342044000000, 30.14],
                [1342130400000, 30.65],
                [1342389600000, 30.40],
                [1342476000000, 30.65],
                [1342562400000, 31.43],
                [1342648800000, 31.89],
                [1342735200000, 31.38],
                [1342994400000, 30.64],
                [1343080800000, 30.02],
                [1343167200000, 30.33],
                [1343253600000, 30.95],
                [1343340000000, 31.89],
                [1343599200000, 31.01],
                [1343685600000, 30.88],
                [1343772000000, 30.69],
                [1343858400000, 30.58],
                [1343944800000, 32.02],
                [1344204000000, 32.14],
                [1344290400000, 32.37],
                [1344376800000, 32.51],
                [1344463200000, 32.65],
                [1344549600000, 32.64],
                [1344808800000, 32.27],
                [1344895200000, 32.10],
                [1344981600000, 32.91],
                [1345068000000, 33.65],
                [1345154400000, 33.80],
                [1345413600000, 33.92],
                [1345500000000, 33.75],
                [1345586400000, 33.84],
                [1345672800000, 33.50],
                [1345759200000, 32.26],
                [1346018400000, 32.32],
                [1346104800000, 32.06],
                [1346191200000, 31.96],
                [1346277600000, 31.46],
                [1346364000000, 31.27],
                [1346709600000, 31.43],
                [1346796000000, 32.26],
                [1346882400000, 32.79],
                [1346968800000, 32.46],
                [1347228000000, 32.13],
                [1347314400000, 32.43],
                [1347400800000, 32.42],
                [1347487200000, 32.81],
                [1347573600000, 33.34],
                [1347832800000, 33.41],
                [1347919200000, 32.57],
                [1348005600000, 33.12],
                [1348092000000, 34.53],
                [1348178400000, 33.83],
                [1348437600000, 33.41],
                [1348524000000, 32.90],
                [1348610400000, 32.53],
                [1348696800000, 32.80],
                [1348783200000, 32.44],
                [1349042400000, 32.62],
                [1349128800000, 32.57],
                [1349215200000, 32.60],
                [1349301600000, 32.68],
                [1349388000000, 32.47],
                [1349647200000, 32.23],
                [1349733600000, 31.68],
                [1349820000000, 31.51],
                [1349906400000, 31.78],
                [1349992800000, 31.94],
                [1350252000000, 32.33],
                [1350338400000, 33.24],
                [1350424800000, 33.44],
                [1350511200000, 33.48],
                [1350597600000, 33.24],
                [1350856800000, 33.49],
                [1350943200000, 33.31],
                [1351029600000, 33.36],
                [1351116000000, 33.40],
                [1351202400000, 34.01],
                [1351638000000, 34.02],
                [1351724400000, 34.36],
                [1351810800000, 34.39],
                [1352070000000, 34.24],
                [1352156400000, 34.39],
                [1352242800000, 33.47],

            ]
        }],
        xaxis: {
            type: 'datetime', // X eksenini tarih yapıyorum
            labels: {
                format: 'MMM yyyy', // Tarih formatını ayarlıyorum
                style: {
                    colors: ['#9aa0ac'], // X ekseni etiket rengi
                    fontSize: '12px'
                }
            },
            categories: ['2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05', '2024-09-06', '2024-09-07', '2024-09-08', '2024-09-09'], // Tarihler
            labels: {
                show: false // X ekseni üzerinde tarihler gösterilmez
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tooltip: {
                enabled: false // X ekseni ile ilgili tooltip gizlenir
            },
            tooltip: {
                enabled: true, // Tooltip'i etkinleştiriyorum
                x: {
                    formatter: function (value, { dataPointIndex, w }) {
                        return new Date(value).toLocaleDateString(); // Tarih formatını ayarlıyorum
                    }
                },
                y: {
                    formatter: function (value) {
                        return "$" + value.toFixed(2); // Y eksenindeki değer formatını ayarlıyorum
                    }
                }
            }
        },
        yaxis: {
            labels: {
                show: false // Y eksenindeki göstergeleri gizler
            },
            axisBorder: {
                show: false // Y eksenindeki çizgiyi gizler
            },
            axisTicks: {
                show: false // Y eksenindeki tik işaretlerini gizler
            }
        },
        grid: {
            borderColor: 'transparent', // Grid sınır rengi
            strokeDashArray: 5, // Grid çizgi stili
            row: {
                colors: [ 'transparent'], // Satır arka plan renkleri
                opacity: 0.5
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#FFBC00'] // Çizgi rengini ayarlıyorum
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.5,
                inverseColors: false,
                opacityFrom: 1.0,
                opacityTo: 0.0,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#FFBC00',
                        opacity: 1.0
                    },
                    {
                        offset: 100,
                        color: '#FFBC00',
                        opacity: 0.0
                    }
                ]
            }
        },
        tooltip: {
            theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
            x: {
                formatter: function (value, { dataPointIndex, w }) {
                    return new Date(value).toLocaleDateString(); // Tarih formatını ayarlıyorum
                }
            },
            y: {
                formatter: function (value) {
                    return "$" + value.toFixed(2); // Y eksenindeki değer formatını ayarlıyorum
                }
            },
            marker: {
                show: true,
                fillColors: ['#FFBC00']
            }
        },
        dataLabels: {
            enabled: false
        },
    };

    var options3 = {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            }
        },
        series: [{
            name: 'Sales',
            data: [150, 100, 300, 200, 99, 250, 300, 351, 425]
        }],
        xaxis: {
            categories: ['2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05', '2024-09-06', '2024-09-07', '2024-09-08', '2024-09-09'], // Tarihler
            labels: {
                show: false // X ekseni üzerinde tarihler gösterilmez
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tooltip: {
                enabled: false // X ekseni ile ilgili tooltip gizlenir
            },
            type: 'category'
        },
        yaxis: {
            labels: {
                show: false // Y eksenindeki göstergeleri gizler
            },
            axisBorder: {
                show: false // Y eksenindeki çizgiyi gizler
            },
            axisTicks: {
                show: false // Y eksenindeki tik işaretlerini gizler
            }
        },
        grid: {
            show: false // Arka plandaki çizgileri gizler
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#54C100'] // Çizgi rengini mor yapıyoruz
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.5,
                inverseColors: false,
                opacityFrom: 1.0,
                opacityTo: 0.0,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#54C100',
                        opacity: 1.0
                    },
                    {
                        offset: 100,
                        color: '#54C100',
                        opacity: 0.0
                    }
                ]
            }
        },
        markers: {
            size: 0, // Noktanın büyüklüğü
            colors: ['#54C100'], // Noktanın rengi (mor)
            strokeColors: '#FFFFFF', // Noktanın çevresi
            strokeWidth: 2
        },
        tooltip: {
            theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light', // Gece/Gündüz moduna göre tema ayarı
            x: {
                formatter: function (value, { dataPointIndex, w }) {
                    // Tooltip'te tarih gösterimi
                    return w.globals.categoryLabels[dataPointIndex]; // X eksenindeki kategoriden tarih bilgisi alınıyor
                }
            },
            y: {
                formatter: function (value) {
                    // Tooltip'te satış değeri gösterimi
                    return value + " Sales"; // Veri değeri formatı
                }
            },
            marker: {
                show: true, // Tooltip'teki işaretleyici noktalar görünür
                fillColors: ['#54C100'] // Marker rengi ayarlanır (örneğin kırmızı)
            }
        },
        dataLabels: {
            enabled: false // Veri etiketlerini gizler
        },
    };




    var options4 = {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            }
        },
        series: [{
            name: 'Sales',
            data: [150, 100, 300, 200, 99, 250, 300, 351, 425]
        }],
        xaxis: {
            categories: ['2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05', '2024-09-06', '2024-09-07', '2024-09-08', '2024-09-09'], // Tarihler
            labels: {
                show: false // X ekseni üzerinde tarihler gösterilmez
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tooltip: {
                enabled: false // X ekseni ile ilgili tooltip gizlenir
            },
            type: 'category'
        },
        yaxis: {
            labels: {
                show: false // Y eksenindeki göstergeleri gizler
            },
            axisBorder: {
                show: false // Y eksenindeki çizgiyi gizler
            },
            axisTicks: {
                show: false // Y eksenindeki tik işaretlerini gizler
            }
        },
        grid: {
            show: false // Arka plandaki çizgileri gizler
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#940000'] // Çizgi rengini mor yapıyoruz
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.5,
                inverseColors: false,
                opacityFrom: 1.0,
                opacityTo: 0.0,
                stops: [0, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#940000',
                        opacity: 1.0
                    },
                    {
                        offset: 100,
                        color: '#940000',
                        opacity: 0.0
                    }
                ]
            }
        },
        markers: {
            size: 0, // Noktanın büyüklüğü
            colors: ['#940000'], // Noktanın rengi (mor)
            strokeColors: '#FFFFFF', // Noktanın çevresi
            strokeWidth: 2
        },
        tooltip: {
            theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light', // Gece/Gündüz moduna göre tema ayarı
            x: {
                formatter: function (value, { dataPointIndex, w }) {
                    // Tooltip'te tarih gösterimi
                    return w.globals.categoryLabels[dataPointIndex]; // X eksenindeki kategoriden tarih bilgisi alınıyor
                }
            },
            y: {
                formatter: function (value) {
                    // Tooltip'te satış değeri gösterimi
                    return value + " Sales"; // Veri değeri formatı
                }
            },
                marker: {
                show: true, // Tooltip'teki işaretleyici noktalar görünür
                    fillColors: ['#940000'] // Marker rengi ayarlanır (örneğin kırmızı)
            }
        },
        dataLabels: {
            enabled: false // Veri etiketlerini gizler
        },
    };

    // Candlestick Chart
    var options5 = {
        chart: {
            type: 'candlestick',
            height: '100%',
            width: '100%',
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 800
            },
            toolbar: {
                show: false
            },
            events: {
                mouseEnter: function (event, chartContext, { dataPointIndex, seriesIndex }) {
                    const tooltip = document.getElementById('chart-tooltip');
                    tooltip.style.display = 'block';
                },
                mouseMove: function (event, chartContext, { dataPointIndex, seriesIndex }) {
                    const tooltip = document.getElementById('chart-tooltip');
                    const x = event.clientX;
                    const y = event.clientY;
                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y}px`;

                    const seriesData = chartContext.w.config.series[seriesIndex].data;
                    if (seriesData && seriesData[dataPointIndex]) {
                        const data = seriesData[dataPointIndex];
                        const date = new Date(data[0]);
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const value = data[1];

                        tooltip.querySelector('.tooltip-date').innerText = `${hours}:${minutes}`;
                        tooltip.querySelector('.tooltip-value').innerText = `Değer: ${value}`;
                    }
                },
                mouseLeave: function (event, chartContext, { dataPointIndex, seriesIndex }) {
                    const tooltip = document.getElementById('chart-tooltip');
                    tooltip.style.display = 'none';
                }
            }
        },
        series: [{
            data: [
                // Buraya candlestick verilerinizi ekleyin
                { x: new Date('2024-01-01').getTime(), y: [155, 160, 145, 150] },
                { x: new Date('2024-02-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2024-03-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2024-04-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2024-05-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2024-06-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2024-07-01').getTime(), y: [155, 160, 145, 150] },
                { x: new Date('2024-08-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2024-09-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2024-10-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2024-11-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2024-12-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2025-01-01').getTime(), y: [155, 160, 145, 150] },
                { x: new Date('2025-02-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2025-03-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2025-04-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2025-05-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2025-06-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2025-07-01').getTime(), y: [155, 160, 145, 150] },
                { x: new Date('2025-08-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2025-09-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2025-10-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2025-11-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2025-12-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2026-01-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2026-02-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2026-03-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2026-04-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2026-05-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2026-06-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2026-07-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2026-08-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2026-09-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2026-10-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2026-11-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2026-12-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2027-01-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2027-02-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2027-03-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2027-04-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2027-05-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2027-06-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2027-07-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2027-08-06').getTime(), y: [185, 195, 150, 170] }


                // Daha fazla veri ekleyebilirsiniz
            ]
        }],
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd:MM',
                show: true
            },
            tickAmount: 60,
            axisBorder: {
                show: true,
                color: '#a9a9a9b3',
                height: 3
            },
            axisTicks: {
                show: true,
                color: '#a9a9a9b3',
                height: 6,
                width: 3
            },
            crosshairs: {
                show: true,
                position: 'back',
                stroke: {
                    color: '#157A01',
                    width: 1,
                    dashArray: 8
                }
            },
            tooltip: {
                enabled: true,
                x: {
                    format: 'dd/MM/yyyy' //tooltip'teki tarih formatı

                }
            },
            labels: {
                datetimeFormatter: {
                    hour: 'dd:MM'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: document.body.classList.contains('dark-mode') ? '#A0A0A0' : '#FFB700' // Y ekseni etiket rengi
                },
                show: true,
                formatter: function (value) {
                    return value.toFixed(2);
                },
                offsetX: -10
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                show: true,
                position: 'back',
                stroke: {
                    color: '#157A01',
                    width: 1,
                    dashArray: 8
                }
            },
            tooltip: {
                enabled: true
            },
            tickAmount: 8
        },
        plotOptions: {
            candlestick: {
                wick: {
                    useFillColor: true
                },
                colors: {
                    upward: '#6362e7',
                    downward: '#FFC811'
                }
            }
        },
        grid: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        tooltip: {
            theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
            marker: {
                fillColors: ['#6362e7']
            },
            x: {
                show: true // X ekseni verilerini göster
            },
            y: {
                formatter: function (value) {
                    return value; // Y eksenindeki değerleri formatla
                }
            },
            style: {
                fontSize: '12px', // Tooltip font boyutu
                fontFamily: 'Helvetica, Arial, sans-serif' // Font ailesi
            }
        }
    };
    // Candlestick Chart
    var options6 = {
        chart: {
            type: 'candlestick',
            height: '100%',
            width: '100%',
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 800
            },
            toolbar: {
                show: false
            },
            events: {
                mouseEnter: function (event, chartContext, { dataPointIndex, seriesIndex }) {
                    const tooltip = document.getElementById('chart-tooltip');
                    tooltip.style.display = 'block';
                },
                mouseMove: function (event, chartContext, { dataPointIndex, seriesIndex }) {
                    const tooltip = document.getElementById('chart-tooltip');
                    const x = event.clientX;
                    const y = event.clientY;
                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y}px`;
                

                    const seriesData = chartContext.w.config.series[seriesIndex].data;
                    if (seriesData && seriesData[dataPointIndex]) {
                        const data = seriesData[dataPointIndex];
                        const date = new Date(data[0]);
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const value = data[1];

                        tooltip.querySelector('.tooltip-date').innerText = `${hours}:${minutes}`;
                        tooltip.querySelector('.tooltip-value').innerText = `Değer: ${value}`;
                    }
                },
                mouseLeave: function (event, chartContext, { dataPointIndex, seriesIndex }) {
                    const tooltip = document.getElementById('chart-tooltip');
                    tooltip.style.display = 'none';
                }
            }
        },
        series: [{
            data: [
                // Buraya candlestick verilerinizi ekleyin
                { x: new Date('2024-01-01').getTime(), y: [155, 160, 145, 150] },
                { x: new Date('2024-02-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2024-03-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2024-04-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2024-05-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2024-06-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2024-07-01').getTime(), y: [155, 160, 145, 150] },
                { x: new Date('2024-08-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2024-09-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2024-10-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2024-11-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2024-12-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2025-01-01').getTime(), y: [155, 160, 145, 150] },
                { x: new Date('2025-02-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2025-03-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2025-04-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2025-05-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2025-06-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2025-07-01').getTime(), y: [155, 160, 145, 150] },
                { x: new Date('2025-08-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2025-09-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2025-10-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2025-11-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2025-12-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2026-01-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2026-02-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2026-03-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2026-04-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2026-05-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2026-06-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2026-07-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2026-08-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2026-09-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2026-10-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2026-11-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2026-12-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2027-01-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2027-02-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2027-03-06').getTime(), y: [185, 195, 150, 170] },
                { x: new Date('2027-04-02').getTime(), y: [170, 175, 155, 160] },
                { x: new Date('2027-05-03').getTime(), y: [155, 175, 150, 170] },
                { x: new Date('2027-06-04').getTime(), y: [165, 170, 150, 160] },
                { x: new Date('2027-07-05').getTime(), y: [175, 185, 160, 170] },
                { x: new Date('2027-08-06').getTime(), y: [185, 195, 150, 170] }


                // Daha fazla veri ekleyebilirsiniz
            ]
        }],
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd:MM',
                show: true,

            },
            tickAmount: 60,
            axisBorder: {
                show: true,
                color: '#a9a9a9b3',
                height: 3
            },
            axisTicks: {
                show: true,
                color: '#a9a9a9b3',
                height: 6,
                width: 3
            },
            crosshairs: {
                show: true,
                position: 'back',
                stroke: {
                    color: '#157A01',
                    width: 1,
                    dashArray: 8
                }
            },
            tooltip: {
                enabled: true,
                x: {
                    format: 'dd/MM/yyyy' //tooltip'teki tarih formatı

                }
            },
            labels: {
                datetimeFormatter: {
                    hour: 'dd:MM'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: document.body.classList.contains('dark-mode') ? '#A0A0A0' : '#FFB700' // Y ekseni etiket rengi
                },
                show: true,
                formatter: function (value) {
                    return value.toFixed(2);
                },
                offsetX: -10
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                show: true,
                position: 'back',
                stroke: {
                    color: '#157A01',
                    width: 1,
                    dashArray: 8
                }
            },
            tooltip: {
                enabled: true
            },
            tickAmount: 8
        },
        plotOptions: {
            candlestick: {
                wick: {
                    useFillColor: true
                },
                colors: {
                    upward: '#0577B9',
                    downward: '#ff0000'
                }
            }
        },
        grid: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        tooltip: {
            theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
            marker: {
                fillColors: ['#6362e7']
            },
            x: {
                show: true // X ekseni verilerini göster
            },
            y: {
                formatter: function (value) {
                    return value; // Y eksenindeki değerleri formatla
                }
            },
            style: {
                fontSize: '12px', // Tooltip font boyutu
                fontFamily: 'Helvetica, Arial, sans-serif' // Font ailesi
            }
        }
    };
    var options7 = {
        chart: {
            height: '100%',
            width: '100%',
            type: 'bubble',
            toolbar: {
                show: false // Üst sekmeleri kapatır
            }
        },
        dataLabels: {
            enabled: false
        },
        series: [{
            name: 'Bubble1',
            data: [
                [69, 14, 13],
                [133, 56, 23],
                [276, 24, 19],
                [490, 14, 29],
                [679, 21, 30]
            ]
        }, {
            name: 'Bubble2',
            data: [
                [28, 17, 16],
                [97, 45, 21],
                [233, 32, 26],
                [356, 11, 22],
                [624, 19, 28]
            ]
        }, {
            name: 'Bubble3',
            data: [
                [40, 39, 14],
                [150, 34, 18],
                [340, 48, 24],
                [480, 36, 22],
                [670, 50, 27]

            ]
        }, {
            name: 'Bubble4',  // Bubble4 datası eklendi
            data: [
                [50, 31, 17],
                [160, 29, 22],
                [370, 40, 23],
                [520, 42, 26],
                [710, 57, 28]
            ]
        }],
        xaxis: {
            tickAmount: 12,
            type: 'category',
            labels: {
                show: true,
                style: {
                    colors: document.body.classList.contains('dark-mode') ? '#A0A0A0' : '#FFB700' // Y ekseni etiket rengi
                }
            },
            axisBorder: {
                show: true,
                color: '#FFB700', // X ekseni çizgi rengi
                offsetY: 0, // Y ekseni çizgisi için ofset
            },
            axisTicks: {
                show: true,
                color: '#FFB700', // X ekseni tik çizgi rengi
                height: 6 // Tik uzunluğu
            }
        },
        yaxis: {
            max: 70,
            labels: {
                style: {
                    colors: document.body.classList.contains('dark-mode') ? '#A0A0A0' : '#FFB700' // Y ekseni etiket rengi
                }
            }
        },
        grid: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        tooltip: {
            theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
            marker: {
                fillColors: ['#6362e7']
            },
            x: {
                show: true // X ekseni verilerini göster
            },
            y: {
                formatter: function (value) {
                    return value; // Y eksenindeki değerleri formatla
                }
            },
            style: {
                fontSize: '12px', // Tooltip font boyutu
                fontFamily: 'Helvetica, Arial, sans-serif' // Font ailesi
            }
        },

        colors: ['#FFB700', '#00B746', '#008FFB', '#775DD0'], // Bubble renkleri
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            markers: {
                radius: 10
            }
        },

    };

    var options8 = {
        chart: {
            height: '100%',
            width: '100%',
            type: 'bubble',
            toolbar: {
                show: false // Üst sekmeleri kapatır
            }
        },
        dataLabels: {
            enabled: false
        },
        series: [{
            name: 'Bubble1',
            data: [
                [133, 56, 23],
                [276, 24, 19],
                [490, 14, 29],
                [679, 21, 30]
            ]
        }, {
            name: 'Bubble2',
            data: [
                [97, 45, 21],
                [233, 32, 26],
                [356, 11, 22],
                [624, 19, 28]
            ]
        }, {
            name: 'Bubble3',
            data: [
                [150, 34, 18],
                [340, 48, 24],
                [480, 36, 22],
                [670, 50, 27]

            ]
        }, {
            name: 'Bubble4',  // Bubble4 datası eklendi
            data: [
                [160, 29, 22],
                [370, 40, 23],
                [520, 42, 26],
                [710, 57, 28]
            ]
        }],
        xaxis: {
            tickAmount: 12,
            type: 'category',
            labels: {
                show: true,
                style: {
                    colors: document.body.classList.contains('dark-mode') ? '#A0A0A0' : '#FFB700' // Y ekseni etiket rengi
                }
            },
            axisBorder: {
                show: true,
                color: '#FFB700', // X ekseni çizgi rengi
                offsetY: 0, // Y ekseni çizgisi için ofset
            },
            axisTicks: {
                show: true,
                color: '#FFB700', // X ekseni tik çizgi rengi
                height: 6 // Tik uzunluğu
            }
        },
        yaxis: {
            max: 70,
            labels: {
                style: {
                    colors: document.body.classList.contains('dark-mode') ? '#A0A0A0' : '#FFB700' // Y ekseni etiket rengi
                }
            }
        },
        grid: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        tooltip: {
            theme: document.body.classList.contains('dark-mode') ? 'dark' : 'light',
            marker: {
                fillColors: ['#6362e7']
            },
            x: {
                show: true // X ekseni verilerini göster
            },
            y: {
                formatter: function (value) {
                    return value; // Y eksenindeki değerleri formatla
                }
            },
            style: {
                fontSize: '12px', // Tooltip font boyutu
                fontFamily: 'Helvetica, Arial, sans-serif' // Font ailesi
            }
        },

        colors: ['#6362e7', '#FFBC00', '#54C100', '#775DD0'], // Bubble renkleri
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            markers: {
                radius: 10
            }
        },

    };

    // Carousel işlevselliği
    const slide = document.querySelector('.carousel-slide');
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showSlide(index) {
        slide.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 3000); // 3000 ms = 3 saniye
    // İlk slide gösterimi
    showSlide(currentIndex);



    createCandleStickChart('#chart-widget1', options1);
    createCandleStickChart('#chart-widget2', options2);
    createCandleStickChart('#chart-widget3', options3);
    createCandleStickChart('#chart-widget4', options4);
    createCandleStickChart('#chart-widget5', options5);
    createCandleStickChart('#chart-widget6', options6);
    createCandleStickChart('#chart-widget7', options7);
    createCandleStickChart('#chart-widget8', options8);




    const fadeInCards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2 // Kartların ne kadar görünür olması gerektiğini belirler
    });

    fadeInCards.forEach(card => {
        observer.observe(card);
    });

    function adjustCardLayout() {
        const cards = document.querySelectorAll('.card');
        const containerWidth = document.querySelector('.container').offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const totalWidth = cardWidth * cards.length;
        const maxWidth = containerWidth;

        // Kartların ekran genişliğine göre yeniden düzenlenmesi
        if (totalWidth > maxWidth) {
            cards.forEach(card => {
                card.style.marginRight = '10px'; // Kartlar arasındaki boşluğu ayarlayın
            });
        } else {
            cards.forEach(card => {
                card.style.marginRight = '20px'; // Yeterli boşluk bırakın
            });
        }
    }

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde kartları yeniden düzenleyin
    adjustCardLayout();
    window.addEventListener('resize', adjustCardLayout);

});
