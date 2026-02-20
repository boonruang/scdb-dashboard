import { useTheme } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { tokens } from '../theme'

const BarChartResearchType = ({ isDashboard = false, data = [] }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <ResponsiveBar
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
            keys={['ปีปัจจุบัน', 'ปีก่อนหน้า']}
            indexBy="type"
            groupMode="grouped"
            layout="horizontal"
            margin={{ top: 30, right: 130, bottom: 30, left: 100 }}
            padding={0.3}
            innerPadding={3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['#4e9af1', '#a0c4ff']}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'จำนวน',
                legendPosition: 'middle',
                legendOffset: 36
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            enableLabel={true}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 110,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 14,
                    effects: [{ on: 'hover', style: { itemOpacity: 1 } }]
                }
            ]}
            role="application"
        />
    )
}

export default BarChartResearchType
