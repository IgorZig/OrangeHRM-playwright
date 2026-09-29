# Credential review — 29 September 2026

Current workbooks use placeholders for custom account usernames/passwords. Public
demo credentials remain in `.env.example` and the central environment helper,
explicitly limited to the OrangeHRM public-demo host. New automated accounts use
generated passwords and are registered for cleanup before creation.

The latest targeted scan inspected 206 relevant blobs reachable from current Git
refs, including 119 report text blobs and historical workbooks. One reachable
historical workbook blob contains custom credential entries (26 cells). The earlier
audit found two such versions before the owner's history updates; changed reachability
does not establish that old copies have been erased. The current files have no remaining
non-placeholder username/password entries detected by that scan. No recognisable
private-key/GitHub-token/AWS-access-key pattern was found. This is a bounded scan,
not proof that every binary artifact or arbitrary token is safe.

The latest owner-updated workbooks were inspected read-only and were not modified.
This check searches labelled username/password workbook cells and recognisable
key/token patterns in selected historical text formats. It does not validate every
embedded screenshot, Git object outside current refs, or arbitrary credential format.

## Remaining owner action

- Treat previously published custom account credentials as exposed. If active or
  reused, revoke/rotate them in the relevant system. Their validity was not tested.
- Sanitising a workbook does not erase its older Git versions, clones or caches.
  History has not been rewritten or force-pushed. Decide whether history cleanup
  is necessary after credential revocation and coordinate it with repository users.
- Review generated reports before sharing: traces and screenshots can contain
  account/session data. They are ignored by Git; Azure artifacts need appropriate
  access and retention settings. Do not upload private-environment traces publicly.

For Azure, configure `ADMIN_PASSWORD` as a secret pipeline variable. Do not put
private values in YAML, tracked `.env` files, workbooks, test names or report metadata.
