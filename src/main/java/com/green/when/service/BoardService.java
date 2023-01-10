package com.green.when.service;


import com.green.when.domain.BoardEntity;
import com.green.when.repositories.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;


    public List<BoardEntity> findBoardsBygroupname(String groupname) {

        return boardRepository.findBoardsBygroupname(groupname);
    }


    public BoardEntity findOne(Long no) {

        return boardRepository.findById(no).orElseThrow(NullPointerException::new);
    }

    @Transactional
    public void create(BoardEntity board) {

        boardRepository.save(board);

        //여기부터 추가


    }

    @Transactional
    public void update(Long no, String title, String content) {
        BoardEntity findBoard = boardRepository.findById(no).orElseThrow(NullPointerException::new);
        findBoard.setTitle(title);
        findBoard.setContent(content);
    }


    @Transactional
    public void delete(BoardEntity board) {

        boardRepository.delete(board);
    }
}
