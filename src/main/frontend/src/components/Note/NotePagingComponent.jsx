import React, {Component} from 'react';
import NoteSentListComponent from './NoteSentListComponent';

export class NotePagingComponent extends Component{

    constructor(props) {
        super(props)
        this.state = {
            num:this.props.num 
            ,paging:this.props.paging
        }
    }
    componentDidMount (){
        this.setState = {
                num: this.props.num
                ,paging: this.props.paging
        }
    }
    viewPaging() {
        const pageNums = [];
        for ( let i = this.state.paging.startPageNum; i<= this.state.paging.endPageNum; i++) {
            pageNums.push(i)
        }
        return (pageNums.map((page) => 
        <li className="page-item" key={page.toString()}>
            <a className="page-link" onClick= {() => NoteSentListComponent.listNote(page)}>{page}</a>
        </li>
        ));
    }
    isPagingPrev(){
        if(this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = { ()=> NoteSentListComponent.listNote((this.state.paging.num - 1) )} tabIndex="-1">이전</a>
                </li>
            );
        }
    }
    
    isPagingNext(){
        if (this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = { ()=> NoteSentListComponent.listNote((this.state.paging.num +1))} tabIndex="-1">다음</a>
                </li>
            )
        }
    }
    isMoveToFirstPage() {
        if (this.state.num !==1){
            return ( 
                <li className="page-item">
                    <a className="page-link" onClick = {() => NoteSentListComponent.listNote(1)} tabIndex="-1">첫 페이지로</a>
                </li>
            )
        }
    }
    isMoveToLastPage() {
        if(this.state.paging.endPageNum !== this.state.paging.lastPage) {
            return (
                <li className="page-item">
                    <a className = "page-link" onClick = {() => this.listNote((this.state.paging.lastPage))} tabIndex="-1"> 마지막페이지로({this.state.paging.lastPage})</a>
                </li>
            )
        }
    }
    render(){
            return(
            <div>
                <div className="row">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {
                            this.isMoveToFirstPage()
                        }
                        {
                            this.isPagingPrev()
                        }
                        {
                            this.viewPaging()
                        }
                        {
                            this.isPagingNext()
                        }
                        {
                            this.isMoveToLastPage()
                        }
                    </ul>
                </nav>
                </div> 
            </div>
            )
    }
}

export default NotePagingComponent;