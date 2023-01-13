package com.green.when.dto;



import com.green.when.domain.BoardEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class BoardDto {

    private Long no;

    private String title;

    private String userid;

    private String content;

    private Long readcount;

    private String groupname;

    private LocalDateTime time;

    private List<FileDto> files;

    public BoardDto(BoardEntity boardEntity) {
        this.no = boardEntity.getNo();
        this.title = boardEntity.getTitle();
        this.userid = boardEntity.getUserid();
        this.content = boardEntity.getContent();
        this.groupname = boardEntity.getGroupname();
        this.readcount = boardEntity.getReadcount();
        this.time = boardEntity.getTime();
        this.files = boardEntity.getFiles().stream().map(FileDto::new).collect(Collectors.toList());
    }




}

