import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";

const CashbookDown = (props) => {
  const cashbookList = props.cashbookList;
  const assetToString = props.assetToString;

  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelFileExtension = ".xlsx";
  const excelFileName = "머니어트";

  const excelDownload = (cashbookList) => {
    const ws = XLSX.utils.aoa_to_sheet([
      [excelFileName],
      [],
      ["날짜", "수입/지출", "자산", "분류", "금액", "내용", "메모"],
    ]);
    cashbookList.map((data) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            data.cashbookDate,
            data.cashbookFinance === 1 ? "수입" : "지출",
            assetToString(data.cashbookAsset),
            data.categoryTitle,
            data.cashbookMoney.toLocaleString("ko-KR") + "원",
            data.cashbookContent,
            data.cashbookMemo,
          ],
        ],
        { origin: -1 }
      );
      ws["!cols"] = [
        { wpx: 130 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 200 },
        { wpx: 200 },
      ];
      return false;
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelButter = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
  };

  return (
    <div className="add-btn etc-btn">
      <DownloadIcon onClick={() => excelDownload(cashbookList)}></DownloadIcon>
    </div>
  );
};

export default CashbookDown;
