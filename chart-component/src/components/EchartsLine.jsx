import React, { useRef, useEffect } from "react";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { SkiaRenderer, SkiaChart } from "@wuba/react-native-echarts";

echarts.use([SkiaRenderer, LineChart, GridComponent]);

export default function Line() {
  const skiaRef = useRef(null);
  useEffect(() => {
    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
    let chart;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, "light", {
        renderer: "skia",
        width: 400,
        height: 400,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);
  return <SkiaChart ref={skiaRef} />;
}
