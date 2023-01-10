package com.green.when.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.management.relation.Role;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "member_tb")
@NoArgsConstructor
@ToString
public class MemberEntity {
    @Id
    @Column(name = "userid", nullable = false)
    private String userid;

    @Column(name = "usernickname", nullable = false)
    private String usernickname;

    @Column(name = "userpw", nullable = false)
    private String userpw;

    @Column(name = "useremail", nullable = false)
    private String useremail;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    /*
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;
*/
    @Lob
    @Column(name = "profiledata")
    private String profiledata;

    public MemberEntity(String userid, String usernickname, String userpw, String useremail,
                        LocalDateTime time, String profiledata) {
        this.userid = userid;
        this.usernickname = usernickname;
        this.userpw = userpw;
        this.useremail = useremail;
        this.time = time;
        this.profiledata = profiledata;
    }
}
