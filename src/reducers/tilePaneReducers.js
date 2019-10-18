export const tilePaneReducer = () => {
    return [
        {
            tileType: "title",
            link: "",
            icon: "fas fa-landmark",
            title: "Current Financial Position",
            gridArea: "a"
        },
        {
            tileType: "smallChartsTile",
            link: "/NetWorth",
            icon: "fas fa-chart-pie",
            title: "Net Worth",
            value: "$172 K",
            subTitle: "What you own",
            gridArea: "b"
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
            gridArea: "d"
        },
        {
            tileType: "largeTextTile",
            link: "/CreditScore",
            icon: "fas fa-landmark",
            title: "Credit Score",
            value: "783",
            gridArea: "e"
        },
        {
            tileType: "title",
            link: "/SavingsPlan",
            icon: "fas fa-chart-line",
            title: "Long Term Savings and Retirement Plan",
            gridArea: "f"
        },
        {
            tileType: "smallChartsTile",
            link: "/TaxPopop",
            icon: "fas fa-balance-scale",
            title: "Pension Income",
            value: "$18,000",
            subTitle: "Est. Pension Income",
            gridArea: "g"
        },

        {
            tileType: "chart",
            link: "/TaxPopup",
            icon: "fas fa-landmark",
            title: "Savings Plan",
            chart: "<StackedBarChart/>",
            gridArea: "h",
        },
        {
            tileType: "largeTextTile",
            link: "/TaxPopup",
            icon: "fas fa-landmark",
            title: "Home Qualifying Max",
            value: "390",
            abbreviation: "k",
            gridArea: "i"
        },
        // {
        //     tileType: "chart",
        //     link: "/LifeTimeIncome",
        //     icon: "fas fa-landmark",
        //     title: "LifeTime Income",
        //     chart: "LifeTimeIncome",
        //     gridArea: "j",
        // },

    ]
}


