import React from "react"
import Immutable from "immutable"
import ImPropTypes from "react-immutable-proptypes"
import ValidCheckSvg from "./assets/check.svg"
import "./validation-pane.less"

const Indicator = ({ status }) => {
  switch(status) {
    case "valid":
    return <div className="vpane-status-bar__indicator">
      <img src={ValidCheckSvg} /> {"VALID"}
      </div>
    case "warnings":
      return <div className="vpane-status-bar__indicator">
      </div>
    case "errors":
      return <div className="vpane-status-bar__indicator">
      </div>
    default:
      return null
  }
}

const ValidationPane = ({ problems }) => {

  const errors = problems.filter(e => e.get("level") === "error")
  const warnings = problems.filter(e => e.get("level") === "warning")

  const status = errors.size ? "errors" : warnings.size ? "warnings" : "valid"

  return <div className={`editor-validation-pane`}>
    <div className={`vpane-status-bar vpane-status-bar--status-${status}`}>
      <div className="vpane-status-bar__indicator">
        <Indicator status={status} />
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
