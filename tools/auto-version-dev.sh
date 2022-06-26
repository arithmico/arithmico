last_version_commit_hash=git log --pretty=format:"%H %s" | grep -m 1 -E "\b[0-9]+\.[0-9]+.[0-9]+\b" | cut -d " " -f1
commits_after_last_version=git log --pretty=format:"%s" $last_version_commit_hash..HEAD
echo $commits_after_last_version