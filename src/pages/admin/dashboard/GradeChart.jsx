import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const GradeChart = ({ students, grades }) => {
  const chartRef = useRef(null);

  // Fungsi untuk menghitung jumlah siswa dalam grade berdasarkan grade_id
  const countStudentsInGrade = (grade) => {
    return students?.filter((student) => student.grade === grade).length;
  };

  // Menghitung jumlah siswa dalam masing-masing grade
  const studentsInGradeData = grades?.map((grade) => {
    return countStudentsInGrade(grade.grade);
  });

  useEffect(() => {
    if (grades && studentsInGradeData) {
      if (chartRef.current !== null) {
        chartRef.current.destroy(); // Menghancurkan grafik sebelumnya jika ada
      }
      const ctx = document.getElementById("myChart").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: grades.map((item) => `Grade ${item.grade}`),
          datasets: [
            {
              label: "Grade",
              data: studentsInGradeData,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
                "rgb(255, 159, 64)",
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
  }, [grades, studentsInGradeData]);

  return <canvas id="myChart"></canvas>;
};

export default GradeChart;
