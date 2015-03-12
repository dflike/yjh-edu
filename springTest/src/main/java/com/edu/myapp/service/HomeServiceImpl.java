package com.edu.myapp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.myapp.dao.HomeDao;

@Service
public class HomeServiceImpl implements HomeService {

   @Autowired
   HomeDao homeDao;

    public List<HashMap<String,Object>> getList(Map<String,String> paramMap) throws Exception{
    	return homeDao.getList(paramMap);
    }
    
    public List<HashMap<String,Object>> existId(Map<String,String> paramMap) throws Exception{
    	return homeDao.existId(paramMap);
    }
    
    public int insertData(Map<String,String> paramMap) throws Exception {
    	return homeDao.insertData(paramMap);
    }
    
    public int updateData(Map<String,String> paramMap) throws Exception {
    	return homeDao.updateData(paramMap);
    }
    
    public int deleteData(Map<String,String> paramMap) throws Exception {
    	return homeDao.deleteData(paramMap);
    }

}
