mkdir -p tmp
last_version_commit_hash=$(git log --pretty=format:"%H %s" | grep -m 1 -E "\b[0-9]+\.[0-9]+.[0-9]+\b" | cut -d " " -f1)
git log --pretty=format:"%s" $last_version_commit_hash..HEAD > tmp/commits.txt
echo commits
echo $(cat tmp/commits.txt)
echo log
git log --pretty=format:"%s" $last_version_commit_hash..HEAD

if cat tmp/commits.txt | grep "breaking:"; then
    echo "major version bump"
    npm version premajor
elif ! cat tmp/commits.txt | grep "breaking:" && cat tmp/commits.txt | grep "feat:"; then
    echo "minor version bump"
    npm version preminor
elif ! cat tmp/commits.txt | grep "breaking:" && ! cat tmp/commits.txt | grep "feat:"; then
    echo "patch version bump"
    npm version prepatch
fi