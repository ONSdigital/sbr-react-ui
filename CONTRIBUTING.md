Contributing guidelines
=======================

### Git workflow

* We use git-flow - create a feature branch from `develop`, e.g. `feature/new-feature`
* Pull requests must contain a succinct, clear summary of what the user need is driving this feature change
* Ensure your branch contains logical atomic commits before sending a pull request - follow the [alphagov Git styleguide](https://github.com/alphagov/styleguides/blob/master/git.md)
* You may rebase your branch after feedback if it's to include relevant updates from the develop branch. We prefer a rebase here to a merge commit as we prefer a clean and straight history on develop with discrete merge commits for features

### Type Annotation Using [Flow](https://flow.org/en/)

* We use Flow as a static type checker for all files in /utils.

Example:

```javascript
// Type annotate variables:
const hello: String = "Hello, world!";

// And methods:
logout(callback: (success: boolean) => void) {
  ...
}
```

* Use `npm run flow` to check for Flow type warnings/errors
