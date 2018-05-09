import { List } from "immutable"

const isValidationPaneError = err => {
  return err.get("type") === "spec"
    && (err.get("source") === "schema" || err.get("source") === "semantic")
}

export default function() {
  return {
    statePlugins: {
      err: {
        wrapSelectors: {
          errorsForUiDisplay: (ori) => (...args) => {
            return (ori(...args) || List())
              .filter(err => {
                return !isValidationPaneError(err)
              })
          }
        }
      }
    }
  }
}
