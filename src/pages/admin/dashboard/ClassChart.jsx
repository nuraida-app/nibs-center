import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const ClassChart = ({ students, classes }) => {
  const chartRef = useRef(null);

  const countStudentsInClass = (className) => {
    return students?.filter((student) => student.class === className).length;
  };

  const studentsInClassData = classes?.map((className) => {
    return countStudentsInClass(className.class);
  });

  useEffect(() => {
    if (classes && studentsInClassData) {
      if (chartRef.current !== null) {
        chartRef.current.destroy(); // Menghancurkan grafik sebelumnya jika ada
      }
      const ctx = document.getElementById("myChart2").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: classes.map((item) => ` ${item.class}`),
          datasets: [
            {
              label: "Class",
              data: studentsInClassData,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
                "rgb(255, 159, 64)",
                "rgb(220, 20, 60)",
                "rgb(0, 191, 255)",
                "rgb(255, 215, 0)",
                "rgb(0, 128, 0)",
                "rgb(128, 0, 128)",
                "rgb(255, 165, 0)",
                "rgb(255, 0, 255)",
                "rgb(0, 255, 255)",
                "rgb(255, 255, 0)",
                "rgb(0, 0, 255)",
                "rgb(0, 255, 0)",
                "rgb(255, 0, 0)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          indexAxis: "y",
        },
      });
    }
  }, [classes, studentsInClassData]);

  return <canvas id="myChart2" width="500" height="300"></canvas>;
};

export default ClassChart;
