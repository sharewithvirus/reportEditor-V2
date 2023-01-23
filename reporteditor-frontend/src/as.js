{
    series: [
      {
        name: 'asasas',
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: 'asasas',
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: 'asasas',
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: 'asasas',
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: 'asasas',
        data: [44, 55, 41, 37, 22, 43, 21],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: 'Fiction Books Sales'
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };