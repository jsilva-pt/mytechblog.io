---
title: Lerna & Yarn Workspaces
description: Use Lerna and Yarn Workspaces to manage multiple javascript packages inside the same repository.
date: 2020-11-18T19:20:00Z
tags:
  - Lerna
  - YarnWorkspaces
  - Monorepos
  - Javascript
  - Reusability
  - Maintainability
---

## Introduction

Each day, people care more and more about code reusability and maintainability, and these are the reasons why tools like Lerna and Yarn Workspaces come in handy.

[Lerna](https://github.com/lerna/lerna) allows us to manage multiple packages inside the same repository instead of creating one repository per package. With Lerna, we can unify processes like linting, building, testing, and releasing, have a single place to report issues, and becomes easier to set up our development environment.

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) allow us to run `yarn install` only once, although we have several packages. Yarn uses a single lock file rather than a different one for each project, which means fewer conflicts. Once all the dependencies are installed together, Yarn can better optimize them. Its most important feature is that when we have one package depending on another package of our repository, yarn link them together, allowing us to use always the most up-to-date code available.

**Note**

Lerna is a very complex tool that allows us to do much more than what I'm describing in this article. My goal is to straightforwardly document the most commonly used features of Lerna with Yarn Workspaces (at least from my experience). If you regularly use some functionality that I'm not explaining here or have some improvement, please open an issue, and let's talk about it!

## Create the project

First lets install lerna globally:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn global add lerna
```

</code-block>
<code-block label="NPM">

```bash
npm install -g lerna
```

  </code-block>
</code-group>

To create a new project or upgrade an existing one to use Lerna, go inside the project folder (e.g., **lerna-repo**) and run:

```bash
lerna init
```

The result is the following folder structure:

```bash
lerna-repo/
└── packages/
└── package.json
└── lerna.json
```

By default, we should place our packages inside the **packages folder**. However, we can rename it or create others for the same purpose. Go to [Organize the folder structure](#organize-the-folder-structure) for more information.

The **lerna.json** file  is where we can configure everything related to Lerna. Its basic configuration is the following:

```json[lerna.json]
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0"
}
```

The **packages** key has a list of globs that indicates the folders where our packages exist.

The **version** key has the current project version when we are using the **fixed versions** or the `independent` value when we are using **independent versions**. Go to [Fixed vs Independent Versions](#fixed-vs-independent-versions) for more information.

The **package.json** file is where we can see the dependencies that our project has and other configurations not necessarily related to Lerna.

Its default structure is the following:

```json[package.json]
{
  "name": "root",
  "private": true,
  "devDependencies": {
    "lerna": "^3.22.1"
  }
}
```
The **name** key is `root` by default, but we can change it to whatever we want.

The **private** key has the value `true` to prevent the root project from being published to npm.

By default, we start with Lerna installed as a **devDependency** once we don't need it in our production build. Go to [Dependencies](#dependencies) for more information.

## Organize the folder structure

As highlighted previously, we should place our packages inside the **packages** folder. However, we can change this configuration.

Imagine we have the following folder structure and we want to **share the packages inside the vue, react, and utilities folders**.

```bash
lerna-repo/
└── components/
|   |── vue/
|   └── react/
|── utilities/
|── package.json
└── lerna.json
```

We just need to update our **lerna.json** file accordingly:

```json[lerna.json]
{
  "packages": [
    "components/vue/*",
    "components/react/*",
    "utilities/*"
  ],
  "version": "0.0.0"
}
```

## Yarn & Yarn Workspaces

### Set up yarn

To configure Lerna to use yarn under the hood, we need to go to the **lerna.json** file and add the **npmClient** key with the value `yarn`. Its value is `npm` by default.

```json[lerna.json]
{
  "packages": [
    "packages/*",
  ],
  "version": "0.0.0",
  "npmClient": "yarn"
}
```

### Set up yarn workspaces

To configure Lerna to use Yarn Workspaces, first, we need to [Set up yarn](#set-up-yarn). Then we have to configure it in the **lerna.json** and **package.json** files.

To do so, let's use the following folder structure as an example:

```bash
lerna-repo/
└── components/
|   |── vue/
|   └── react/
|── utilities/
|── package.json
└── lerna.json
```

In the **package.json** file, we add the **workspaces** key with a list of globs that indicates the folders where we want to store our packages.

```json[package.json]
{
  "name": "root",
  "private": true,
  "workspaces": [
    "components/vue/*",
    "components/react/*",
    "utilities/*"
  ],
  "devDependencies": {
    "lerna": "^3.22.1"
  }
}
```

In the **lerna.json** file, we can remove the **packages** key because the  **workspaces** key in the **package.json** file overrides it. We also need to add the **useWorkspaces** key with the value `true`.

```json[lerna.json]
{
  "version": "0.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

## Fixed vs Independent Versions

By default, when we start a project, Lerna is configured to use fixed versions. However, we can modify it even by providing the `independent` flag:

```bash
lerna init --independent
```

Or going to the **lerna.json** file and change the value of the **version** key to `independent`, which is what the flag does.

```json[lerna.json]
{
  "packages": [
    "packages/*"
  ],
  "version": "independent"
}
```

### Fixed versions

**Fixed versions** mean that the project has a single version, which is kept in the **lerna.json** file. However, the packages itself can be in different minor or patch versions. Check the [Semantic Versioning Specification](https://semver.org/) for more information about versioning.

Consider the following folder structure where we have all the components at the same version:

```bash
lerna-repo/
└── components/
|   |── app-button # 1.0.0
|   |── app-icon   # 1.0.0
|   └── app-list   # 1.0.0
|── package.json
└── lerna.json    # 1.0.0
```

When we add a **new feature** to the **app-list** component and run `lerna publish`, Lerna looks to the version present in the **lerna.json** file, updates it (1.0.0 -> 1.1.0), and uses that version to release a new package of the **app-list** component to the npm.

```bash
lerna-repo/
└── components/
|   |── app-button # 1.0.0
|   |── app-icon   # 1.0.0
|   └── app-list   # 1.1.0
|── package.json
└── lerna.json    # 1.1.0
```

All the other packages stay in the version they were before since nothing changed them. It means we only release a new version of a package when we need to.

If we add a **fix** to the **app-button** component and run `lerna publish` again, the version in the **lerna.json** file is updated from `1.1.0` to `1.1.1` and used to publish the **app-button** component.
```bash
lerna-repo/
└── components/
|   |── app-button # 1.1.1
|   |── app-icon   # 1.0.0
|   └── app-list   # 1.1.0
|── package.json
└── lerna.json    # 1.1.1
```

Regarding **major versions**, it works differently. When we publish a major version of one package, it results in new versions for all packages, even if not all packages have changed since the last release.

So, if we add a breaking change to the **app-icon** component, the versions of each package would be:

```bash
lerna-repo/
└── components/
|   |── app-button # 2.0.0
|   |── app-icon   # 2.0.0
|   └── app-list   # 2.0.0
|── package.json
└── lerna.json    # 2.0.0
```

### Independent Versions

**Independent versions** mean that we can increment package versions independently of each other.

When we use independent versions, the project itself has no version. The value of the **version** key in the **lerna.json** file is `independent`. Each package has its own version. It means that we can have packages in different major versions:

```bash
lerna-repo/
└── components/
|   |── app-button # 1.0.0
|   |── app-icon   # 2.1.0
|   └── app-list   # 3.0.3
|── package.json
└── lerna.json    # independent
```

It also means that the **tags** created in our repository will be **per package** and not referent to the entire repository.

### Tags

Using the steps described in the **Fixed Versions** section, the tags generated in our repository are the following:

| |
|:------------- |
| 2.0.0 |
| 1.1.1 |
| 1.1.0 |
| 1.0.0 |

The same steps using **Independent versions** results in the following tags:

|  |
|:------------- |
| `app-icon@2.0.0` |
| `app-button@1.1.1` |
| `app-list@1.1.0` |
| `app-button@1.0.0` |
| `app-icon@1.0.0` |
| `app-list@1.0.0` |

I suggest you follow those steps and understand if you can reach the same outcome.

## Packages vs Scoped Packages

All npm packages have a name. Some also have a scope. Scopes are a way of grouping related packages together.

When we sign up for an npm user account or create an organization, we can use a scope that matches our user or organization name. The same happens for Github Packages Registry. In both registries, my username is **jsilva-pt**, so my scope is also **jsilva-pt**.

Using packages without a scope, we can easily have naming conflicts with other person packages. For example, we can not create a package named jquery on npm because it already exists.

When we use scoped packages, naming is not a problem because we are naming packages inside our scope.

If I were creating a new scoped package called **app-card**, its name in the **package.json** file would be **@jsilva-pt/app-card**.

### Create a package

There are several ways to create packages:
- using the `lerna create` command;
- create the package folder manually and then run `yarn init`;
- create everything manually;

Both `lerna create` and `yarn init` ask several questions to generate the **package.json** file, but only the **name**, **version** and  **main** keys matter.

It’s also important that our new package starts at a version of `0.0.0` because once we do our first publication, Lerna publishes at `0.1.0` or `1.0.0`.

#### lerna create

Using `lerna create` we can run the following commands when we have only one packages folder configured:

```bash
# for simple packages
lerna create my-new-package

# for scoped packages
lerna create @jsilva-pt/my-new-package
```

When we have more than one folder configured we must specify where we want to create the package:

```bash
# for simple packages
lerna create my-new-package <package-folder>

# for scoped packages
lerna create @jsilva-pt/my-new-package <package-folder>
```


The folder structure resultant is the following:

```bash
lerna-repo/
└── packages/
|   └── my-new-package/
|       |── __testes__
|       |   └── my-new-package.test.js
|       |── lib
|       |   └── my-new-package.js
|       |── packages.json
|       └── README.md
|── package.json
└── lerna.json
```

Depending on what are our packages, it can contain files and folders that we don't want.

#### create folder manually + yarn init

Create the **my-new-package** folder manually and then inside it run:

```bash
yarn init
```

This way we generate the unique mandatory file we need (the **package.json** file), and then we can structure the package as we want.

```bash
lerna-repo/
└── packages/
|   └── my-new-package/
|       └── packages.json
|── package.json
└── lerna.json
```

#### create everything manually

Once we know the keys that matter, we can manually create both the package folder and the package.json file. Then, it is up to us to structure the folder.

```json[package.json]
{
  "name": "my-new-package",
  "version": "0.0.0",
  "main": "index.js"
}
```

### List packages

Using the following folder structure, versions, and privacy as an example:

```bash
lerna-repo/
└── components/
|   |── app-button # 1.1.1 - public
|   |── app-icon   # 1.0.0 - public
|   └── app-list   # 1.0.0 - private
|── package.json
└── lerna.json    # 1.1.1
```

List all public packages

```bash
lerna ls

# result
app-button
app-icon
```

List all packages (public and private)

```bash
lerna ls --all

# result
app-button
app-icon
app-list (private)
```

List all public packages with more details

```bash
lerna ll
# or
lerna ls -l

# result
app-button v1.1.1 components/app-button
app-icon v1.1.1 components/app-icon
```

List all public and private packages with details

```bash
lerna la
# or
lerna ls -la

# result
app-button v1.1.1 components/app-button
app-icon v1.1.1 components/app-icon
app-list v1.1.1 components/app-list (private)
```

## Dependencies
The dependencies of our projects are registered inside the **package.json** file. This file is usually in the project's root folder, but it is also inside each package in the Lerna projects. **Each package has its dependencies.**

```bash
lerna-repo/
└── components/
|   |── app-button
|   |      |── package.json
|   |      └── ...
|   |── app-icon
|   |      |── package.json
|   |      └── ...
|   └── app-list
|          |── package.json
|          └── ...
|── package.json
└── lerna.json
```
To add dependencies to the packages, Lerna provides us the command `lerna add`. Note that only a single package can be added at a time compared to `yarn add` or `npm install`.

### Add dependencies

The **dependencies** key must contain all the dependencies our project/application/package/library needs to work in production. **We know when we must declare it as a dependency when its absence has side effects on your production build.**

**Adding dependencies**

```bash
# add a dependency to one package
lerna add lodash --scope=app-button

# add a dependency to several packages
lerna add lodash components/app-*

# add a dependency to all packages
lerna add lodash

# add a package as a dependency
lerna add app-icon --scope=app-button

# add a dependency on the root package.json
lerna add lodash -w
```

### Add devDependencies

The **devDependencies** key must contain all the **dependencies we use during development or needed during the build of our production bundle**. To add a dependency as devDependency just add the flag `--dev`.

```bash
# add a devDependency to one package
lerna add lodash --scope=app-button --dev

# add a devDependency to several packages
lerna add lodash components/app-* --dev

# add a devDependency to all packages
lerna add lodash  --dev

# add a devDependency on the root package.json
lerna add lodash -w  --dev
```

### Add peerDependencies

The  **peerDependencies** key is **used when our package has a dependency that can also be a dependency of the project using it**. If our package has a dependency that can also be used by its dependent, we can specify the version required by us and the dependent will receive a warning when not matching that requirement.

```bash
# add a peerDependency to one package
lerna add lodash --scope=app-button --peer

# add a peerDependency to several packages
lerna add lodash components/app-*  --peer

# add a peerDependency to all packages
lerna add lodash  --peer
```

### Updating dependencies

Well, that is a problem. Lerna has no direct command to upgrade dependencies, which is ok when we want to update a dependency in the root package.json. We can use yarn as usually:

```bash
# update a dependency on the root package.json
yarn upgrade lodash
```

However, when we want to  upgrade a dependency inside a package, nothing seems to work. Using `lerna exec` as we use it to remove dependencies does not work.

For now, what I do is manually update the dependencies version in the package.json file of each package and then run `yarn install`.

### Removing dependencies

Lerna also has no direct way to allow us to remove dependencies from the project or packages but we can use the `lerna exec` and `yarn remove` commands to go around it.

`lerna exec` allow us to run a specific command within a particular package, several packages (using a glob expression), or in all of them. Using it with `yarn remove` we can remove dependencies from the packages. Using `yarn remove` alone we can also remove dependencies from the root package.json.

```bash
# remove a dependency to one package
lerna exec --scope app-button -- yarn remove lodash

# remove a dependency to several packages
lerna exec --scope app-* -- yarn remove lodash

# remove a dependency to all packages
lerna exec -- yarn remove lodash

# remove a dependency from the root package.json
yarn remove lodash
```

## Local development

### Set up an existent project

We don't create new projects every day. Most of the time, we work on projects that already exist. To make a Lerna project work locally, we must clone it, and then run:

```bash
yarn install
```
### Link a package

Often we have packages depending on other local packages. To do that, we need to add it as a dependency, and Yarn Workspaces makes use of the local code instead of the code published in the npm. When we change the package's code acting as a dependency, it automatically reflects in the dependent package.

However, when we have another repository using these packages through npm, it is not so easy. Changing code in the Lerna project does not reflect in the project using it. We need to publish a new release and then update the version in the dependent project.

To solve this we can use `yarn link`.

Yarn link allows us to link a package into another project. With it, instead of using a package from the npm registry, it uses the local code.

First, we go inside the package folder in the Lerna project that we want to test and run:

```bash
yarn link

# result
# success Registered "app-card".
# info You can now run `yarn link "app-card"`
# in the projects where you want to use this package and
# it will be used instead.
```

Then we go inside the project that uses the package as a dependency and run:

```bash
yarn link app-card

# result
# success Using linked package for "app-card".
```

Now, instead of using the package installed in the node_modules folder, it uses the linked package.

### Unlink the package

Once we did all our tests, we may unlink the package.

```bash
yarn unlink app-card

# result
# success Removed linked package "app-card".
# info You will need to run `yarn install --force` to re-install
# the package that was linked.
```

Unlinking the package does not reinstall the package from the npm. If we try to run our project, we have an error saying that it can not find the package app-card, so we have to do it manually either by following the suggested command or adding the package again:

```bash
yarn install --force
# or
yarn add app-button
```

If we do not need the symlink anynome, we can safely destroy it. We go inside the package where we created the symlink and run:

```bash
yarn unlink

# result
# success Unregistered "app-card".
# info You can now run `yarn unlink "app-card"`
# in the projects where you no longer want to use this package.
```

### List modified packages

Like the `git status` command that shows us the files that we modified, Lerna provides us the command `lerna changed` that shows us the packages (not the files) that we modified compared to the remote repository.

```bash
lerna changed
```

### Diffing

**All modifications**

Like the `git diff` command but ignoring the files outside the packages, Lerna provides us the command `lerna diff` that shows us all the code modifications we did. We can also provide a package name to see only the modifications to that package.

```bash
# all modifications
lerna diff

# modifications in a specific package
lerna diff my-reusable-card
```

## Publish

To publish our packages using Lerna we use the command `lerna publish` but, first, let's configure Lerna only to allow us to create newer versions of our packages from our main branch (eg. master).

```json[lerna.json]
{
  "version": "0.0.0",
  "command": {
    "version": {
      "allowBranch": "master"
    }
  }
}
```

Now, if we try to run `lerna publish` inside another branch, it will fail. As highlighted in the [Lerna documentation](https://github.com/lerna/lerna/tree/main/commands/version#--allow-branch-glob), this is a best practice that can save us some problems.

To publish a **scoped package** we also need to set the `publishConfig.access` to `true` in its **package.json**:

```json[components/app-button/package.json]
{
  "name": "@jsilva-pt/app-button",
  "version": "0.0.0",
  "publishConfig": {
    "access": "public"
  }
}
```
Setting this configuration in a package without a scope fails to publish.

Imagine that we started developing the **app-button** package, and although we merged some initial versions, we didn't finish yet, and **we don't want to release it to npm yet**. We can add to its **package.json** the **private** key with the value `true`, and Lerna will ignore it.

```json[components/app-button/package.json]
{
  "name": "app-button",
  "version": "0.0.0",
  "private": true
}
```

### npm

To publish to npm, first, we need to have an npm account.

We can see if we are logged in running:

```bash
npm whoami
```

In case we are not, we do it running:

```bash
npm login
```

Once we are logged in we can run:

```bash
lerna publish
```

Which prompts possible versions to update each package. It's up to us to select the right ones based on what we have done. Check the [Semantic Versioning Specification](https://semver.org/) for more information about versioning.

### Github Package Registry

To publish in the Github Packages Registry, we need some extra configurations.

First, in the **package.json** of each package, we must specify the repository where our code lives.

```json[package.json]
{
  ...
  "repository" : {
    "type" : "git",
    "url": "ssh://git@github.com:jsilva-pt/mytechblog.io.git"
  }
}
```

Then, in the **lerna.json** file, we must specify the registry to publish the packages. By default, it is the npm registry. We have to change it to the `https://npm.pkg.github.com`.

```json[lerna.json]
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0",
  "command": {
    "version": {
      "allowBranch": "master"
    },
    "publish": {
      "registry": "https://npm.pkg.github.com"
    }
  }
}
```

We also have to create a personal token on GitHub with the permissions to read and write packages (`read:packages` and `write:packages`).

Using the generated token as a password, we authenticate on GitHub Package Registry:

```bash
$ npm login --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC EMAIL ADDRESS
```

And we are ready to publish packages:

```bash
lerna publish
```

## Conventional Commits

Lerna allows us to use the [Conventional Commits Specification](https://www.conventionalcommits.org/) to determine the bump version and generate the CHANGELOG.md files automatically.

Follow the specification, when we are creating a new release, Lerna checks all the commits since the last release and it increments:
- the PATCH number when the subject of the commit is prefixed with `fix:`;
- the MINOR number when the subject of the commit is prefixed with `feat:`. It has precedence over the PATCH;
- the MAJOR number when in the body of some commit it finds a string `BREAKING CHANGE:`. It can have any type provided in the subject and it has precedence over PATCH and MINOR. 

Considering that we are using fixed versions and our project is in the version `1.0.0`. If we try to create a new release with the following commit, our project version is updated to `1.0.1`.
```bash
# commit 1
subject -> "fix: fix button font size"
```

Then, if we do two more commits and publish again, the version is updated to `1.1.0`.
```bash
# commit 1
subject -> "fix: fix button border-radius"
# commit 2
subject -> "feat: added loading status to the button"
```

Finally, if we do three more commits, the version is updated to `2.0.0`.
```bash
# commit 1
subject -> "fix: fix button text color"
# commit 2
subject -> "feat: added outlined style"
# commit 3
subject -> "feat: changed the loading property to isLoading"
body: "BREAKING CHANGE: loading prop must be updated to isLoading"
```

### Configuration

To do that, we update our lerna.json file:

```bash
{
  ...
  "command": {
    "publish": {
       "conventionalCommits": true, 
       "yes": true
    }
  }
}
```

Now, when we run `lerna publish` instead of asking us what version we want to give to each package, it automatically determines and publishes those versions.

## Summary

Wow, this is an extensive article, but now we know:
- How to create a Lerna project;
- How to set up yarn and yarn workspaces;
- The difference between fixed and independent versions and their impact on the tags created;
- The difference between packages and scoped packages. How to create and list them;
- The difference between dependencies, devDependencies, and peerDependencies. How to add, update and remove them;
- How to efficiently develop locally using `yarn link`, `yarn unlink`, `lerna changed` and `lerna diff`;
- How to publish public and private packages on npm and Github Packages Registry and how to automatize it with Conventional Commits.