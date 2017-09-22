import os
root = '../build'
top_dirs = [ x for x in os.listdir(root) if os.path.isdir(os.path.join(root, x))]

def clean(name):
    return name.title().replace('Capi', 'cAPI').replace('-',' ')

print('---')
for top_dir in top_dirs:
    formatName = clean(top_dir)
    print('- id: "{}"'.format(top_dir))
    print('  formatName: "{}"'.format(formatName))
    print('  styles:')
    dir_list = os.listdir(os.path.join(root, top_dir))
    for sub_dir in dir_list:
        platform = 'AMP' if sub_dir == 'amp' else sub_dir.capitalize()
        pretty_style_name = "{} - {}".format(platform, formatName)
        print('      - path: "{}"'.format(os.path.join(root, top_dir, sub_dir)))
        print('        name: "{}"'.format(pretty_style_name))
