package kr.or.iei.cashbook.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="cashbook")
public class Cashbook {

	private int cashbookNo;
	private int memberNo;
	private int cashbookFinance;
	private String cashbookDate;
	private int cashbookLoop;
	private int loopMonth;
	private int cashbookAsset;	//1:현금, 2:신용카드,3:체크카드, 4이체, 5:기타
	private int cashbookCategory;
	private int cashbookMoney;
	private String cashbookContent;
	private String cashbookMemo;
	
	private int memberId;//화면 노출용
}
