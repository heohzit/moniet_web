package kr.or.iei.cashbook.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="ce")
public class CalendarElement {

	private String title;				//money, 풀캘린더 events 추가용
	private String cashbookDate;
	private int cashbookFinance;	//1.수입, 2.지출
	private String date;			//money, 풀캘린더 events 추가용
	private String textColor;			//money, 풀캘린더 events 추가용
	
	
	
}
