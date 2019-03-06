import React from 'react';
import T from 'i18n-react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LabelComponent,EditComponent } from '.';
import { cvActions } from '../_actions';
import { formsActions } from '../_actions';
import { otherConstants } from '../_constants';

class FormComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.state.lang='en';
    this.handleEditEntry= this.handleEditEntry.bind(this);
    this.handleSubmitEntry= this.handleSubmitEntry.bind(this);
    this.updateClientData = this.updateClientData.bind(this);
  }

  handleEditEntry (key){
    var sectionname = this.props.formParams.sectionname;
    this.props.dispatch(
      formsActions.edit(
        this.props.formParams.page,
        this.props.formParams.id,key
      )
    );
  }
  
  handleSubmitEntry (id,key,value){
      this.props.dispatch(
        formsActions.update(
          this.props.uniqueId, 
          this.props.formParams.page,
          this.props.formParams.id,
          this.props.formParams.api,
          id,
          key,
          value,
          this.props.formParams.fields.find(
            field =>
              field.entryName == key).localized
              ?this.state.lang
              :'no-local',
          this.props.parentId,
          this.updateClientData
        )
      );
  }
  
  updateClientData (id,key,value,insert){
    
      if(this.props.uniqueId){
        console.log ('#1');
        this.props.formEntries[key] = value;
      }else{
         if (!insert){ 
           console.log ('#2',  this.props.formEntries, key, id);
           this.props.formEntries.find(
           entry => entry.id == id).value = value
         }else{
           console.log ('#3');
           this.props.formEntries.push(
             {
               "id":id, 
               "key": key, 
               "language":
                 this.props.formParams.fields.find(
                   field => 
                    field.entryName == key).localized 
                      ?this.state.lang
                      :'no-local', 
               "value": value,
               "cv_id": this.props.parentId 
             });
         }
      }
  }

  render(){
    T.setTexts( require('../'+this.state.lang+'.yml'));
    return (
      <div>
        {this.props.uniqueId && 
         this.props.formParams.fields && 
         this.props.formEntries &&
         this.props.formParams.fields.map((field, index) =>
          <div className="input-group mb-3" key={field.entryName}>
            <div className="input-group-prepend">
              <span className="input-group-text">
                <T.text tag="label" 
                  text={{key: field.entryTrad }}/>
              </span>
            </div>
            {!field.editing &&
             <LabelComponent 
               onClick={()=>{this.handleEditEntry(field.entryName)}} 
               entryValue={this.props.formEntries[field.entryName]} 
             />}
            {field.editing &&
             <EditComponent onSubmit={this.handleSubmitEntry} 
               field={field} 
               id={this.props.uniqueId?this.props.formEntries.id:null}
               entryValue={this.props.formEntries[field.entryName]} 
             />}
            {field.calling &&
             <img src={otherConstants.REQUEST_SYMBOL} />}
          </div>
        )}
        {!this.props.uniqueId && 
         this.props.formParams.fields && 
         this.props.formEntries &&
         this.props.formParams.fields.map((field, index) =>
           <div className="input-group mb-3" key={field.entryName}>
             <div className="input-group-prepend">
               <span className="input-group-text">
                 <T.text tag="label" 
                   text={{key: field.entryTrad }}/>
               </span>
             </div>
             {!field.editing && console.log ('this.props.formEntries',this.props.formEntries , field) &&
               <LabelComponent 
                  onClick={()=>{this.handleEditEntry(field.entryName)}} 
                  entryValue={
                  this.props.formEntries.find(
                  entry =>
                    { entry.key == field.entryName
                    && entry.language == 
                      (field.localized?this.state.lang:'no-local')}) 
                  ?this.props.formEntries.find(
                  entry => 
                   { entry.key == field.entryName 
                    && entry.language == 
                      (field.localized?this.state.lang:'no-local')} 
                 ).value
                  :''} 
               />}
             {field.editing &&
               <EditComponent onSubmit={this.handleSubmitEntry} 
                 field={field} 
                 id={this.props.uniqueId
                     ?this.props.formEntries.id
                     :this.props.formEntries.find(
                       entry => 
                         entry.key == field.entryName)
                       ?this.props.formEntries.find(
                         entry => 
                           entry.key == field.entryName
                        ).id
                        :false}
                 entryValue={
                   this.props.formEntries.find(
                   entry => entry.key == field.entryName)
                   ?this.props.formEntries.find(
                   entry => 
                     entry.key == field.entryName
                     && entry.language == 
                       field.localized
                       ?this.state.lang
                       :'no-local' 
                   ).value
                   :''} 
               />}
            {field.calling &&
             <img src={otherConstants.REQUEST_SYMBOL} />}
          </div>
        )}
      </div>
    )
  }
}
function mapStateToProps(state) {
  const {cv} = state;
  return {
    cv
  };
}

const connectedFormComponent = connect(mapStateToProps)(FormComponent);
export { connectedFormComponent as FormComponent };
