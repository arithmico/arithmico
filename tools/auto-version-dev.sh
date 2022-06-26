mkdir -p tmp
last_version_commit_hash=$(git log --pretty=format:"%H %s" | grep -m 1 -E "\b[0-9]+\.[0-9]+.[0-9]+\b" | cut -d " " -f1)
git log --pretty=format:"%s" $last_version_commit_hash..HEAD > tmp/commits.txt
cat tmp/commits.txt