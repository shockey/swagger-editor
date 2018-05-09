// 1. Wrap the Errors container to filter out structural and semantic errors
// 2. Wrap the EditorLayout to inject a ValidationPane below it
// 3.

import { List } from "immutable"

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

export default function() {
  return {
    statePlugins: {
      err: {
        wrapSelectors: {
          errorsForUiDisplay
        }
      }
    }
  }
}
