package com.edu.myapp;

import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edu.myapp.service.HomeService;

/**
 * Handles requests for the application home page.
 */
/**
 * @author istro01
 *
 */
/**
 * @author istro01
 *
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	 HomeService homeService;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "index";
	}
	
	/**
	 * @param sColumn	검색 컬럼명(이름, 역할, 직급)
	 * @param sText		검색어
	 * @param request
	 * @param model
	 * @return getList	검색 결과
	 * @throws Exception
	 */
	@RequestMapping(value="/getJsonByMap", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<HashMap<String, Object>> getJsonByMap(
			@RequestParam(value = "sColumn", required = false, defaultValue = "") String sColumn,
			@RequestParam(value = "sText", required = false, defaultValue = "") String sText,
			HttpServletRequest request, Model model)throws Exception {

		Map<String,String> paramMap = new HashMap<String,String>();
		
		// 검색어 및 컬럼명 설정
		if(!"".equals(sColumn)) {
			if("name".equals(sColumn)) {
				paramMap.put("name", sText);
			} else if("role".equals(sColumn)) {
				paramMap.put("role", sText);
			} else if("rank".equals(sColumn)) {
				paramMap.put("rank", sText);
			}
		}
		
		List<HashMap<String, Object>> getList = homeService.getList(paramMap);

		return getList; 

	}
	
	/**
	 * @param _id		중복 체크할 아이디
	 * @param request
	 * @param model
	 * @return YN 리턴
	 * @throws Exception
	 */
	@RequestMapping(value="/existId", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String existId(
			@RequestParam(value = "_id", required = true) String _id,
			HttpServletRequest request, Model model)throws Exception {

		Map<String,String> paramMap = new HashMap<String,String>();
		// 중복체크 할 아이디 세팅
		paramMap.put("_id", _id);
		
		List<HashMap<String, Object>> getList = homeService.existId(paramMap);
		
		// 아이디 검색 결과 값이 존재하면 Y값 리턴 없으면 N값 리턴
		if(getList.size() > 0) {
			return "Y";
		} else {
			return "N";
		}
	}
	
	/**
	 * @param _id		등록할 아이디
	 * @param name		등록할 이름
	 * @param role		등록할 직급
	 * @param rank		등록할 등급
	 * @param regDt		등록된 날짜
	 * @param request
	 * @param model
	 * @return 수행 결과 메세지
	 * @throws Exception
	 */
	@RequestMapping(value="/insertData", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String insertData(
			@RequestParam(value = "_id", required = true) String _id,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "role", required = false) String role,
			@RequestParam(value = "rank", required = false) String rank,
			@RequestParam(value = "regDt", required = false) String regDt,
			HttpServletRequest request, Model model)throws Exception {

		Map<String,String> paramMap = new HashMap<String,String>();
		// 등록 할 데이터 세팅
		paramMap.put("_id", _id);
		paramMap.put("name", name);
		paramMap.put("role", role);
		paramMap.put("rank", rank);
		paramMap.put("regDt", regDt);

		int rtn = homeService.insertData(paramMap);
		
		// 등록 수행 결과 메세지 리턴
		if(rtn == 1) {
			return "Insert Success!";
		} else {
			return "Insert Failure!";
		}
	}
	
	/**
	 * @param _id		수정할 대상을 찾을 아이디
	 * @param name		수정될 이름
	 * @param role		수정될 직급
	 * @param rank		수정될 등급
	 * @param regDt		수정된 날짜
	 * @param request
	 * @param model
	 * @return 수행 결과 메세지
	 * @throws Exception
	 */
	@RequestMapping(value="/updateData", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String updateData(
			@RequestParam(value = "_id", required = true) String _id,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "role", required = false) String role,
			@RequestParam(value = "rank", required = false) String rank,
			@RequestParam(value = "regDt", required = false) String regDt,
			HttpServletRequest request, Model model)throws Exception {

		Map<String,String> paramMap = new HashMap<String,String>();
		// 수정할 데이터 세팅
		paramMap.put("_id", _id);
		paramMap.put("name", name);
		paramMap.put("role", role);
		paramMap.put("rank", rank);
		paramMap.put("regDt", regDt);

		int rtn = homeService.updateData(paramMap);
		
		// 수정 수행 결과 메세지 리턴
		if(rtn == 1) {
			return "Update Success!";
		} else {
			return "Update Failure!";
		}
	}
	
	/**
	 * @param _id		삭제할 대상을 찾을 아아디
	 * @param request
	 * @param model
	 * @return 수행 결과 메세지
	 * @throws Exception
	 */
	@RequestMapping(value="/deleteData", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String deleteData(
			@RequestParam(value = "_id", required = true) String _id,
			HttpServletRequest request, Model model)throws Exception {

		Map<String,String> paramMap = new HashMap<String,String>();
		// 삭제할 대상이 될 아이디 세팅
		paramMap.put("_id", _id);
		
		int rtn = homeService.deleteData(paramMap);
		
		// 삭제 결과 메세지 리턴
		if(rtn == 1) {
			return "Delete Success!";
		} else {
			return "Delete Failure!";
		}
	}

}
