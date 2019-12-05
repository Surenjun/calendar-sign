import * as React from 'react';

import * as T from '../types';
import './sign.less';
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';
import {compose}from 'redux'
import sign from '../img/did-sign.png'
type ISignProps = T.IProps & T.ISignProps;

@connect<Partial<ISignProps>, T.IHeaderState>(
  store2Props,
  actions,
)
export default class Sign extends React.Component<
  Partial<ISignProps>,
  T.ISignState
  > {
  constructor(props: ISignProps) {
    super(props);
  }
  componentDidMount(): void {

  }

  render() {
    let {
      actions: {action},
      main,
    } = this.props;
    return <div id="sign" className="sign">
      <div className="sign-con">
        <div className="sign-close" onClick={async ()=>{
         await action.commonChange('main.isOpenSign',false)
        }}/>
        <div className="sign-go"/>
        <div className="sign-tip">今日签到获得&nbsp;100&nbsp;积分</div>
        <div className="sign-content">
          {
            /*补上空的div*/
            this.getEmpty().map((item,key)=> <div key={key} className="sign-empty-item"/>)
          }
          {
            this.setDivs().map((item,key)=> <div key={key} className="sign-item"
              //签到存在设置选中
             style={this.isSigned(key + 1)?{backgroundImage:`url(${sign})`}:{}}
            >
              <span
                style={this.isSigned(key + 1)?{color:'#fff'}:{}}
                className="number">
                {(key + 1) > 9 ? key + 1: `0${key + 1}`}</span>
            </div>)
          }
        </div>
      </div>
    </div>
  }

  /*判断当前是否签到*/
  isSigned =  daySign =>{
    //模拟当前签到
    const signDays = [1,2,3,11,22,30];
    return signDays.includes(daySign);
  };
  /**
   * 获取当前月份1号是星期几
   * @param {number} date 今天是几号
   * @param {number} day  今天是周几
   */
  getStartDay = ([date , day])=>{
    const result=day-(date%7-1);
    return result < 0 ? 7 + result:result;
  };
  /*获取今天是几号 是周几*/
  getNow = ()=> [new Date().getDate(), new Date().getDay()];

  /*获取当前月份的总天数*/
  getDays = ()=>{
    const date=new Date();
    date.setMonth(date.getMonth()+1);
    date.setDate(0);
    return date.getDate();
  };
  /*生成div*/
  setDiv = number =>{
    let arr = [];
    for (;number--;){arr.push('');}
    return arr;
  };

  /*生成补空div*/
  getEmpty = compose(this.setDiv,emptyNum=> (emptyNum ? emptyNum : 7 )- 1 ,this.getStartDay, this.getNow);

  /*生成渲染到页面里的div*/
  setDivs= compose(this.setDiv , this.getDays);
}
