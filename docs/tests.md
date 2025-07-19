# UI Test Cases for ERM Application

## Control Panel
- [ ] Add new entity of each type. See the entity in detail panel in edit mode
- [ ] Clicking `Search` toggles visibility of search panel
- [ ] Clicking `Demo Data` populates tags and central panel

## Tag Panel
- [ ] Tag tree renders with correct counts
- [ ] Expand/collapse toggles sub-tags
- [ ] Edit Tags shows Add/Delete buttons and pencil icons
- [ ] Adding a tag with slashes adds the entire parent child chain selected tag 
updates tree correctly (with selected tag or without (top level))
- [ ] Adding a tag under selected tag updates tree correctly
- [ ] Adding a tag with spaces and special characters works under selected tag updates tree correctly
- [ ] Adding a tag with slashes adds the entire parent child chain selected tag updates tree correctly
- [ ] Adding a tag with no selection adds to root
- [ ] Renaming a tag updates tag display and persists after reload
- [ ] Deleting selected tags removes them from tree and the entities that have 
that tag no longer have that tag

## Search
- [ ] Clicking on **Search** button toggles the search panel
- [ ] Selecting entity type populates appropriate fields
- [ ] Entering attribute filter and executing shows correct matches with and without tag selected tags
- [ ] Entering relationship filter (entity type, relation, target name) shows related matches
- [ ] Combining search + tag filters produces intersection set
- [ ] Multiple tags can be selected and entities with all the selected tags are shown

## Central Panel
- [ ] Up to 20 results shown per page
- [ ] Pagination works with more than 20 items
- [ ] Sort by different fields changes order
- [ ] Clicking a result loads detail into right panel
- [ ] Bulk edit reveals checkboxes and bulk action bar
- [ ] Add/Remove tag affects all selected entities
- [ ] Add relation works for multiple entities with same relation type
- [ ] Delete removes selected entities from UI and backend
- [ ] Close button exits bulk edit mode

## Right Panel
- [ ] Fields with values shown in detail mode
- [ ] Edit button enables editing fields
- [ ] Rich-text editor is enabled for description
- [ ] Adding photos/attachments via upload works
- [ ] Adding media via URL works
- [ ] Adding named URLs works
- [ ] Delete button removes entity and updates center panel as well as tag counts
- [ ] Relation panel shows relations grouped by relation type
- [ ] Clicking related entity loads it in detail view and highlighted in center panel if 
it is there
- [ ] Clicking 'relations' shows relation list for related entity
- [ ] Edit relation enables delete per relation

## 🔗 Relationship Panel 

### View Mode

- [ ] **Relations** button shows a dedicated relationship panel
- [ ] Relations are grouped by relation type
- [ ] Relation rows show: type (left), label (middle), related entity (right)
- [ ] Clicking a related entity:
  - Loads the entity in the right panel
  - Highlights the card in the center panel if visible
- [ ] Clicking the `Relations` link of a related entity:
  - Loads the relation view for that entity

### Edit Mode

- [ ] Clicking `Edit Relations` enables edit mode
- [ ] Delete button appears next to each relation
- [ ] Clicking delete removes the relation

## Synchronization
- [ ] Editing tags updates left tree and counts
- [ ] Editing entity updates display in center panel
- [ ] Deleting entity removes from center and relation lists
- [ ] Relation updates reflect in both entities
