package com.green.when.repositories;


import com.green.when.domain.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {


    List<BoardEntity> findByTitleContainingOrContentContaining(String title, String content);


    List<BoardEntity> findBoardsBygroupnameOrderByTimeDesc(String groupname);

    List<BoardEntity> findByUseridOrderByTimeDesc(String userid);

    // void deleteAllByNo(List<BoardDeleteDto> boardDeleteDtoList);


}


/*
Containg = &LIKE&
OR =  OR

 */