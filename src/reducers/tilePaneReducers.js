export const tilePaneReducer = () => {
    return [
        {
            tileType: "title",
            link: "",
            icon: "fas fa-landmark",
            title: "Current Financial Position",
            gridArea: "h"
        },
        {
            tileType: "smallChartsTile",
            link: "/NetWorth",
            icon: "fas fa-chart-pie",
            title: "Net Worth",
            value: "$172 K",
            subTitle: "What you own",
            gridArea: "n"
        },
        {
            tileType: "smallChartsTile",
            link: "/CashFlow",
            icon: "fas fa-money-bill-wave",
            title: "Hard Spending Limit",
            value: "$22 K",
            subTitle: "In-flow",
            gridArea: "c"
        },
        {
            tileType: "smallChartsTile",
            link: "/TaxPopop",
            icon: "fas fa-balance-scale",
            title: "Marginal Tax Rate",
            value: "40%",
            subTitle: "Tax breakdown",
            gridArea: "t"
        },
        {
            tileType: "smallChartsTile",
            link: "/TaxPopop",
            icon: "fas fa-balance-scale",
            title: "Pension Income",
            value: "$18,000",
            subTitle: "Est. Pension Income",
            gridArea: "z"
        },
        {
            tileType: "largeTextTile",
            link: "/TaxPopup",
            icon: "fas fa-landmark",
            title: "Credit Score",
            value: "783",
            gridArea: "s"
        },
        {
            tileType: "largeTextTile",
            link: "/TaxPopup",
            icon: "fas fa-landmark",
            title: "Home Qualifying Max",
            value: "390",
            abbreviation: "k",
            gridArea: "p"
        },
        {
            tileType: "largeTextTile",
            link: "/TaxPopup",
            icon: "fas fa-landmark",
            title: "Required Retirement Savings",
            value: "1.4",
            abbreviation: "m",
            gridArea: "q"
        },

        {
            tileType: "title",
            link: "/SavingsPlan",
            icon: "fas fa-chart-line",
            title: "Savings and retirement plan",
            gridArea: "r"
        },
        {
            tileType: "chart",
            link: "/TaxPopup",
            icon: "fas fa-landmark",
            title: "Savings Plan",
            chart: "savingsChart",
            gridArea: "e",
        },
        {
            tileType: "chart",
            link: "/LifeTimeIncome",
            icon: "fas fa-landmark",
            title: "LifeTime Income",
            chart: "LifeTimeIncome",
            gridArea: "l",
        },

    ]
}


