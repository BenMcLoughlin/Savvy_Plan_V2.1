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
            tileType: "single",
            link: "/NetWorth",
            icon: "fas fa-chart-pie",
            title: "Net Worth",
            value1: "$172,000",
            subTitle1: "What you own",
            gridArea: "n"
        },
        {
            tileType: "dual",
            link: "/CashFlow",
            icon: "fas fa-money-bill-wave",
            title: "Current Financial Position",
            value1: "$102,000",
            subTitle1: "In-flow",
            value2: "$98,000",
            subTitle2: "Out-flow",
            gridArea: "c"
        },
        {
            tileType: "single",
            link: "/TaxPopop",
            icon: "fas fa-balance-scale",
            title: "Tax Position",
            value1: "40%",
            subTitle1: "Marginal Tax Rate",
            gridArea: "t"
        },
        {
            tileType: "single",
            link: "/TaxPopup",
            icon: "fas fa-landmark",
            title: "Credit Score",
            value1: "783",
            gridArea: "s"
        },
        {
            tileType: "title",
            link: "/SavingsPlan",
            icon: "fas fa-chart-line",
            title: "Savings and retirement plan",
            gridArea: "r"
        },
        {
            tileType: "triple",
            link: "/TaxPopup",
            icon: "fas fa-coins",
            title: "Pension Income",
            value1: "$17,000",
            subTitle1: "Canada Pension Plan",
            value2: "$7,000",
            subTitle2: "Old Age Security",
            value3: "$19,000",
            subTitle3: " Benefit Pension",
            gridArea: "p",
        },
        {
            tileType: "chart",
            link: "/TaxPopup",
            icon: "fas fa-landmark",
            title: "Savings Plan",
            chart: "savingsChart",
            gridArea: "q",
        },
        {
            tileType: "chart",
            link: "/LifeTimeIncome",
            icon: "fas fa-landmark",
            title: "LifeTime Income",
            chart: "lifetimeIncome",
            gridArea: "l",
        },

    ]
}


