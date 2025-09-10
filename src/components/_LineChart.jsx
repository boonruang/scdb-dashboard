import { ResponsiveLine } from "@nivo/line"
import { useTheme } from "@mui/material"
import { tokens } from "../theme"
// import { mockLineData as data } from "../data/mockData"
import { useState } from "react"

import { useSelector } from "react-redux"

const LineChart = ({ isDashboard = false, data }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    // if (data) {
    //     console.log('herbalpriceyearReducer data',data)
    // }

    let colorArr = [
        tokens("dark").redAccent[200],
        tokens("dark").greenAccent[500],
        tokens("dark").blueAccent[200],        
        tokens("dark").yellowAccent[300],
        tokens("dark").blueAccent[600],        
    ]

    // for (let i=0; i < colorArr.length ; i++ ) {
    //     console.log('color ',i , colorArr[i])
    // }
    if (data) {
        for (let i=0; i < data.length ; i++ ) {
            // mod value is 0, 1, 2, 3, 4,
            data[i].color = colorArr[i%5]
        }

        // if (data) {
        //     console.log('data',data)
        // }
    }


    return (
        <ResponsiveLine
            data={data && data}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100]
                        }
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100]
                        }
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1
                        },
                        text: {
                            fill: colors.grey[100]
                        }
                    }
                },
                legends: {
                    text: {
                        fill: colors.grey[100]
                    }
                },
                tooltip: {
                    container: {
                        background: colors.yellowAccent[700],
                        color: colors.grey[100],
                        fontSize: 12
                    },
                }
            }}
            colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                legend: 'ปี',
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                // legend: isDashboard ? undefined : 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                legend: 'ราคา',
                orient: 'left',
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                // legend: isDashboard ? undefined : 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default LineChart