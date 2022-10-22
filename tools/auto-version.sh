mkdir -p tmp
last_version_commit_hash=$(git log --pretty=format:"%H %s" | grep -m 1 -E "\b[0-9]+\.[0-9]+.[0-9]+\b" | cut -d " " -f1)
git log --pretty=format:"%s" $last_version_commit_hash..HEAD > tmp/commits.txt

if cat tmp/commits.txt | grep -i "breaking:"; then
    echo "major version bump"
    npm version major
elif ! cat tmp/commits.txt | grep "breaking:" && cat tmp/commits.txt | grep "feat:"; then
    echo "minor version bump"
    npm version minor
elif ! cat tmp/commits.txt | grep "breaking:" && ! cat tmp/commits.txt | grep "feat:"; then
    echo "patch version bump"
    npm version patch
fi