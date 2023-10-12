package kr.or.iei.cashbook.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="category")
public class Category {

	private int categoryNo;
	private String categoryTitle;
	private int categoryRef;
	private int categoryDefault;
	private int memberNo;
	private String memberId;
	
	private int cashbookMoney;
}
