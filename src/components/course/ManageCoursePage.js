import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // This might run when React thinks props has changed, even though it hasn't
    // changed. So check course ID to make sure we need to re-render.
    if (this.props.course.id !== nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      // When Ajax call finishes, Redux state is passed down to props. We need
      // to setState() to trigger a re-render.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }
  updateCourseState(event) {
    const field = event.target.name;
    // Avoid mutating state by using Object.assign().
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    // actions.saveCourse() thunk returns the value of the inner function,
    // i.e. courseApi.saveCourse() which is a Promise.
    // See https://github.com/reduxjs/redux/issues/1676#issuecomment-215413478
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect());
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    // Redirect to courses index page.
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router.
// https://github.com/ReactTraining/react-router/blob/f3ef7f4/packages/react-router/docs/api/context.router.md
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  // Since filter() returns an array, grab the first.
  if (course.length) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  // From path '/course/:id'
  const courseId = ownProps.params.id;

  let course = {id: '', watchHref:'', title: '', authorId: '', length: '', category: ''};
  // On initial load, state.course is empty as waiting for Ajax call.
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
