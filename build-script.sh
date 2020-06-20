# failsafe if i didn't commit
git add . && git commit -m "Updates" && git push

# build and push the subtree to gh-pages
yarn build && git add build -f && git commit -m "Rebuild" && git push origin `git subtree split --prefix build master`:gh-pages --force && git reset HEAD~
