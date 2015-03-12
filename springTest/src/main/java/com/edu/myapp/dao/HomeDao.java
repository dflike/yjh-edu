package com.edu.myapp.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class HomeDao {

   @Autowired
    private SqlSession sqlSession;

    public List<HashMap<String,Object>> getList(Map<String,String> paramMap) throws Exception{
    	return sqlSession.selectList("home.getList", paramMap);
    }
    
    public List<HashMap<String,Object>> existId(Map<String,String> paramMap) throws Exception{
    	return sqlSession.selectList("home.existId", paramMap);
    }
    
    public int insertData(Map<String,String> paramMap) throws Exception {
    	return sqlSession.insert("home.insertData", paramMap);
    }
    
    public int updateData(Map<String,String> paramMap) throws Exception {
    	return sqlSession.insert("home.updateData", paramMap);
    }
    
    public int deleteData(Map<String,String> paramMap) throws Exception {
    	return sqlSession.insert("home.deleteData", paramMap);
    }
    
} 
