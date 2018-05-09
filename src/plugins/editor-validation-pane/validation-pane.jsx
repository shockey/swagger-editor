import React from "react"
import Immutable from "immutable"
import ImPropTypes from "react-immutable-proptypes"
import "./validation-pane.less"

const ValidationPane = ({ problems }) => {

  const errors = problems.filter(e => e.get("level") === "error")
  const warnings = problems.filter(e => e.get("level") === "warning")

  const status = errors.size ? "errors" : warnings.size ? "warnings" : "valid"

  return <div className={`editor-validation-pane`}>
    <div className={`vpane-status-bar vpane-status-bar--status-${status}`}>
      <div className="vpane-status-bar__indicator">
        { errors.size ? "INVALID" : "VALID" }
      </div>
    </div>
  </div>
}

ValidationPane.propTypes = {
  problems: ImPropTypes.list.isRequired
}

ValidationPane.defaultProps = {
  problems: Immutable.List()
}

export default ValidationPane

// Helper components
