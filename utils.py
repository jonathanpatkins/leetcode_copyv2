import yaml


def yaml_loader(filepath):
    """Loads a yaml file"""
    with open(filepath, "r") as file_descriptor:
        data = yaml.full_load(file_descriptor)
    return data
