import { useTheme } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { tokens } from '../theme'

const BarChartResearchQuartile = ({ isDashboard = false, data = [] }) => {
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
            keys={['จำนวน']}
            indexBy="quartile"
            margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
            padding={0.35}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['#4e9af1']}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'Quartile',
                legendPosition: 'middle',
                legendOffset: 36
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'จำนวน',
                legendPosition: 'middle',
                legendOffset: -50
            }}
            enableLabel={true}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            role="application"
        />
    )
}

export default BarChartResearchQuartile
