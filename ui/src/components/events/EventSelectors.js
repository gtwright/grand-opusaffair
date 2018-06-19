import React, {Component} from "react";
import queryString from 'query-string';
import {withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import { withRouter } from "react-router-dom";


class EventSelectors extends Component {


  handleChange = (e) =>{
    this.props.onViewChange(e.target.value);
    this.updateSearch({view:e.target.value})
  }

  componentDidMount = () => {
    const parsed = queryString.parse(this.props.location.search);
    const viewSelection = parsed.view;
    const views = ['events','pastEvents','popularEvents','updatedEvents'];
    if (views.indexOf(viewSelection)>-1) {
      this.props.onViewChange(viewSelection);
    }
  }

  updateSearch = (obj) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: queryString.stringify(Object.assign({}, queryString.parse(this.props.location.search), obj))
    });
  }

  render(){

    const {classes, view} = this.props;

    return (
      <div className={classes.box}>
        <Select
            value={view}
            onChange={this.handleChange}
          >
            <MenuItem value={'events'}>Upcoming</MenuItem>
            <MenuItem value={'popularEvents'}>Popular</MenuItem>
            <MenuItem value={'pastEvents'}>Past</MenuItem>
            <MenuItem value={'updatedEvents'}>Updated</MenuItem>
          </Select>
      </div>)
  }
}


const styles = theme => ({
  box: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxWidth: theme.appContainer.maxWidth,
    alignSelf: 'flex-start',
    margin: 'auto'
  },
});

export default withStyles(styles, {withTheme: true})(withRouter(EventSelectors)) ;
