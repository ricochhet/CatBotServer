from typing import List

from pydantic import BaseModel


# {"channels" : ["id1", "id2", ...]}
class IgnoredChannels(BaseModel):
    channels: List[str]
