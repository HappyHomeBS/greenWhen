package com.green.when.mapper;


import com.green.when.vo.MemberVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//기존 DaoImpl 대신 mapper와 다이렉트 연결
@Repository
@Mapper
public interface UserMapper {

    void signup(MemberVo memberVo);

    boolean userCheck(String userid);

    Optional<MemberVo> findByUserid(String userid);

    void changeUserNickname(MemberVo memberVo);

    void changeUserPw(MemberVo memberVo);

}
