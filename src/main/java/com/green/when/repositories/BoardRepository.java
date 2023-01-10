package com.green.when.repositories;

import com.green.when.domain.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

    List<BoardEntity> findBoardsBygroupname(String groupname);
}
