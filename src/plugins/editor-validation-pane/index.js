// 1. Wrap the Errors container to filter out structural and semantic errors
// 2. Wrap the EditorLayout to inject a ValidationPane below it
// 3.

// TODO: fix use of html IDs in the Editor
// TODO: consider breaking up this file

import React from "react"
import { List } from "immutable"
import "./editor.less"

// Wrap-Components

const WrapEditorContainerWithValidationPane = (EditorContainer) => props => {
  return <div className={`split-editor-validation-pane-container`}>
    <EditorContainer {...props} />
    <div className={`editor-validation-pane`}>Validation</div>
  </div>
}

// Wrap-Selectors

const errorsForUiDisplay = (ori) => (...args) => {
  return (ori(...args) || List())
    .filter(err => {
      return !isValidationPaneError(err)
    })
}

// Helpers

function isValidationPaneError(err) {
  return err.get("type") === "spec"
    && (err.get("source") === "schema" || err.get("source") === "semantic")
}

// Plugin

export default function() {
  return {
    wrapComponents: {
      EditorContainer: WrapEditorContainerWithValidationPane
    },
    statePlugins: {
      err: {
        wrapSelectors: {
          errorsForUiDisplay
        }
      }
    }
  }
}
