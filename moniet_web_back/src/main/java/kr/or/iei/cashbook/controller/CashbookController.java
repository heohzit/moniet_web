package kr.or.iei.cashbook.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.cashbook.model.service.CashbookService;
import kr.or.iei.cashbook.model.vo.Cashbook;

@RestController
@RequestMapping(value="/cashbook")
public class CashbookController {

	@Autowired
	private CashbookService cashbookService;
	
	@PostMapping(value="/list")
	public Map cashbookList(@RequestBody Cashbook cashbook, @RequestAttribute String memberId) {
		cashbook.setMemberId(memberId);
		List cashbookList = cashbookService.cashbookList(cashbook);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("cashbookList", cashbookList);
		return map;
	}
	
	@PostMapping(value="/total")
	public Map cashbookSum(@RequestBody Cashbook cashbook, @RequestAttribute String memberId) {
		cashbook.setMemberId(memberId);
		Map map = cashbookService.sumOfCashbook(cashbook);
		return map;
	}
}
