package kr.or.iei.cashbook.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.iei.cashbook.model.service.CashbookService;

@RestController
@RequestMapping(value="/cashbook")
public class CashbookController {

	@Autowired
	private CashbookService cashbookService;
	
	@GetMapping(value="/list")
	public Map cashbookList() {
		List cashbookList = cashbookService.cashbookList();
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("cashbookList", cashbookList);
		return map;
	}
	
	@GetMapping(value="/total")
	public Map cashbookSum() {
		Map map = cashbookService.sumOfCashbook();
		return map;
	}
}
