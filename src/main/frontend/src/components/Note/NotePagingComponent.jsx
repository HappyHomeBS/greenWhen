import React, {Component} from 'react';
import NoteSentListComponent from './NoteSentListComponent';
import * as NoteListComponent from './NoteListComponent';
export class NotePagingComponent extends Component{

    constructor(props) {
        super(props)
        this.state = {
            num: 1 
            ,paging: {}
        }
        // this.isMoveToFirstPage = this.isMoveToFirstPage(this)
        // this.isMoveToLastPage = this.isMoveToLastPage(this)
        // this.isPagingNext = this.isPagingNext(this)
        // this.isPagingPrev = this.isPagingPrev(this)
        // this.isPagingPrev = this.viewPaging(this)
    }
    
    componentDidMount(){
    console.log("......................")
    console.log(this.state)
    this.setState({
        num: this.props.num
        ,paging: this.props.paging
    })
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.paging !== nextProps.paging){
            return {
                num: nextProps.num
                ,paging: nextProps.paging
            }
        }
        console.log (nextProps.value)
    }
    componentDidUpdate() {
        console.log("자식 업데이트")
        console.log(this.state)
    }
    goPage(page){
        this.props.pagi(page);
    }

    viewPaging() {
        const pageNums = [];
        for ( let i = this.props.paging.startPageNum; i<= this.props.paging.endPageNum; i++) {
            pageNums.push(i)
        }
        return (pageNums.map((page) => 
        <li className="page-item" key={page.toString()}>
            <a className="page-link" onClick= {() => this.goPage(page)}>{page}</a>
        </li>
        ));
    }
    isPagingPrev(){
        if(this.props.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = { ()=> this.goPage(this.props.num-1)} tabIndex="-1">이전</a>
                </li>
            );
        }
    }
    
    isPagingNext(){
        if (this.props.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick = { ()=> this.goPage(this.props.num+1)} tabIndex="-1">다음</a>
                </li>
            )
        }
    }
    isMoveToFirstPage() {
        if (this.props.num !==1){
            return ( 
                <li className="page-item">
                    <a className="page-link" onClick = {() => this.goPage(1)} tabIndex="-1">첫 페이지로</a>
                </li>
            )
        }
    }
    isMoveToLastPage() {
        if(this.props.paging.endPageNum !== this.props.paging.lastPage) {
            return (
                <li className="page-item">
                    <a className = "page-link" onClick = {() => this.goPage(this.props.paging.lastPage)} tabIndex="-1"> 마지막페이지로({this.props.paging.lastPage})</a>
                </li>
            )
        }
    }
    render(){
        console.log("c-render")
        console.log(this.state)
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

export default NoteListComponent.withRouter(NotePagingComponent);