import { ResponsivePie } from "@nivo/pie"
import { tokens } from "../theme"
import { useTheme } from "@mui/material"

const PieChartResearchDept = ({ data = [] }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <ResponsivePie
            data={data}
            theme={{
                axis: {
                    domain: { line: { stroke: colors.grey[100] } },
                    legend: { text: { fill: colors.grey[100] } },
                    ticks: {
                        line: { stroke: colors.grey[100], strokeWidth: 1 },
                        text: { fill: colors.grey[100] }
                    }
                },
                legends: { text: { fill: colors.grey[100] } },
                tooltip: {
                    container: {
                        background: colors.primary[400],
                        color: colors.grey[100],
                        fontSize: 12
                    }
                }
            }}
            margin={{ top: 30, right: 80, bottom: 70, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            valueFormat=" >-.1f"
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 4,
                    itemWidth: 80,
                    itemHeight: 18,
                    itemTextColor: colors.grey[200],
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 14,
                    symbolShape: 'circle',
                    effects: [{ on: 'hover', style: { itemTextColor: colors.grey[100] } }]
                }
            ]}
        />
    )
}

export default PieChartResearchDept
