import { ReportFormatedData, ReportResponseData  } from "@/types/report.type";

    const formatReportData = (data: ReportResponseData[]): ReportFormatedData[] => {
        return data.map((item: ReportResponseData) => {
            let name: string;

            if (item.date) {
                const date = new Date(item.date);
                if (isNaN(date.getTime())) {
                    name = item.date;
                } else {
                    name = date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
                }
            } else {
                name = item._id
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (c) => c.toUpperCase())
                    .trim();
            }
            return {
                name,
                value: item.amount,
            };
        });
    };

export {formatReportData}
