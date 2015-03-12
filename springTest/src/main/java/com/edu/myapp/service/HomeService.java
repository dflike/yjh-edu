package com.edu.myapp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface HomeService {
	public List<HashMap<String,Object>> getList(Map<String,String> paramMap) throws Exception;
	
	public List<HashMap<String,Object>> existId(Map<String,String> paramMap) throws Exception;
	
	public int insertData(Map<String,String> paramMap) throws Exception;
	
	public int updateData(Map<String,String> paramMap) throws Exception;
	
	public int deleteData(Map<String,String> paramMap) throws Exception;

}
